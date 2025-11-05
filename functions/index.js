/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onSchedule} = require("firebase-functions/v2/scheduler");
const {onDocumentWritten} = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");
const logger = require("firebase-functions/logger");

admin.initializeApp();

const {Pool} = require("pg");

// Initialize PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {rejectUnauthorized: false},
});

/**
 * Auto-close auction when timer ends
 * Triggered by Firestore document update or scheduled function
 */
exports.autoCloseAuction = onDocumentWritten(
    "products/{productId}",
    async (event) => {
      const productId = event.params.productId;
      const before = event.data.before?.data();
      const after = event.data.after?.data();

      try {
        // Check if auction_end_time has passed
        if (!after || !after.auction_end_time) {
          return;
        }

        const endTime = after.auction_end_time.toDate();
        const now = new Date();

        // Only process if auction just ended (within last minute)
        if (endTime > now || (now - endTime) > 60000) {
          return;
        }

        // Check if already closed
        if (after.status === "sold" || after.status === "ended") {
          return;
        }

        logger.info(`Closing auction for product ${productId}`);

        // Update PostgreSQL
        const pgResult = await pool.query(
            `UPDATE products 
             SET status = 'sold' 
             WHERE id = $1 AND status = 'approved' 
             RETURNING *`,
            [productId]
        );

        if (pgResult.rows.length === 0) {
          logger.warn(`Product ${productId} not found or already closed`);
          return;
        }

        const product = pgResult.rows[0];

        // Update Firestore
        await admin.firestore()
            .collection("products")
            .doc(productId)
            .update({status: "sold"});

        // Notify winner via FCM if exists
        if (product.highest_bidder_id) {
          const winnerTokens = await pool.query(
              "SELECT fcm_token FROM fcm_tokens WHERE user_id = $1",
              [product.highest_bidder_id]
          );

          if (winnerTokens.rows.length > 0) {
            const tokens = winnerTokens.rows.map((row) => row.fcm_token);
            const message = {
              notification: {
                title: "🎉 You won the auction!",
                body: `Congratulations! You won ${product.title} for $${product.current_bid}`,
              },
              data: {
                type: "auction_won",
                product_id: productId,
                product_title: product.title,
                bid_amount: product.current_bid?.toString(),
              },
              tokens: tokens,
            };

            try {
              await admin.messaging().sendEachForMulticast(message);
              logger.info(`Sent winner notification to ${tokens.length} devices`);
            } catch (fcmError) {
              logger.error("FCM error:", fcmError);
            }
          }

          // Log notification in database
          await pool.query(
              `INSERT INTO notifications (type, title, message, user_id, read) 
               VALUES ($1, $2, $3, $4, false)`,
              [
                "auction_won",
                "🎉 You won the auction!",
                `Congratulations! You won ${product.title} for $${product.current_bid}`,
                product.highest_bidder_id,
              ]
          );
        }

        logger.info(`Auction ${productId} closed successfully`);
      } catch (error) {
        logger.error(`Error closing auction ${productId}:`, error);
      }
    }
);

/**
 * Scheduled function to check and close expired auctions every minute
 */
exports.checkExpiredAuctions = onSchedule(
    "every 1 minutes",
    async (event) => {
      logger.info("Checking for expired auctions...");

      try {
        // Get all active auctions from Firestore
        const activeAuctions = await admin.firestore()
            .collection("products")
            .where("status", "==", "approved")
            .get();

        const now = new Date();

        for (const doc of activeAuctions.docs) {
          const data = doc.data();
          const productId = doc.id;

          if (!data.auction_end_time) {
            continue;
          }

          const endTime = data.auction_end_time.toDate();

          // If auction has ended, trigger close
          if (endTime <= now) {
            logger.info(`Triggering close for expired auction ${productId}`);
            await admin.firestore()
                .collection("products")
                .doc(productId)
                .update({status: "approved"}); // Trigger document update
          }
        }
      } catch (error) {
        logger.error("Error checking expired auctions:", error);
      }
    }
);
