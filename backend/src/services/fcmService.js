import admin from "../config/firebaseConfig.js";
import pool from "../config/db.js";

/**
 * Send FCM notification to single device
 * @param {string} fcmToken - FCM token of the device
 * @param {Object} notification - Notification payload
 * @param {Object} data - Additional data payload
 * @returns {Promise<string>} Message ID
 */
export const sendFCMNotification = async (fcmToken, notification, data = {}) => {
  try {
    const message = {
      token: fcmToken,
      notification: {
        title: notification.title,
        body: notification.body,
      },
      data: {
        ...data,
        ...Object.keys(notification).reduce((acc, key) => {
          if (typeof notification[key] === 'string') {
            acc[key] = notification[key];
          }
          return acc;
        }, {})
      },
      android: {
        priority: 'high',
      },
      apns: {
        headers: {
          'apns-priority': '10',
        payload: {
          aps: {
            sound: 'default',
            badge: 1,
          },
        },
      },
    };

    const response = await admin.messaging().send(message);
    console.log("Successfully sent FCM message:", response);
    return response;
  } catch (error) {
    console.error("Error sending FCM notification:", error);
    throw error;
  }
};

/**
 * Send FCM notification to multiple devices
 * @param {string[]} fcmTokens - Array of FCM tokens
 * @param {Object} notification - Notification payload
 * @param {Object} data - Additional data payload
 * @returns {Promise<Object>} Batch response
 */
export const sendFCMNotificationToMultiple = async (fcmTokens, notification, data = {}) => {
  try {
    const message = {
      notification: {
        title: notification.title,
        body: notification.body,
      },
      data: {
        ...data,
      },
      android: {
        priority: 'high',
      },
      apns: {
        headers: {
          'apns-priority': '10',
        },
        payload: {
          aps: {
            sound: 'default',
            badge: 1,
          },
        },
      },
      tokens: fcmTokens,
    };

    const response = await admin.messaging().sendEachForMulticast(message);
    console.log(`Successfully sent ${response.successCount} FCM messages`);
    return response;
  } catch (error) {
    console.error("Error sending FCM notifications:", error);
    throw error;
  }
};

/**
 * Save FCM token for user
 * @param {number} userId - PostgreSQL user ID
 * @param {string} fcmToken - FCM token
 */
export const saveFCMToken = async (userId, fcmToken) => {
  try {
    // Check if user has FCM tokens table column or separate table
    // For now, we'll use a simple approach - update user table if column exists
    // Or create a separate fcm_tokens table
    
    // Check if fcm_tokens table exists, if not we'll handle it gracefully
    await pool.query(
      `INSERT INTO fcm_tokens (user_id, token, created_at) 
       VALUES ($1, $2, NOW()) 
       ON CONFLICT (user_id, token) DO UPDATE SET updated_at = NOW()`,
      [userId, fcmToken]
    );
  } catch (error) {
    // If table doesn't exist, log but don't fail
    console.warn("FCM tokens table might not exist:", error.message);
    // Try alternative: update users table if fcm_token column exists
    try {
      await pool.query(
        `UPDATE users SET fcm_token = $1 WHERE id = $2`,
        [fcmToken, userId]
      );
    } catch (updateError) {
      console.warn("Could not save FCM token:", updateError.message);
    }
  }
};

/**
 * Get FCM tokens for user
 * @param {number} userId - PostgreSQL user ID
 * @returns {Promise<string[]>} Array of FCM tokens
 */
export const getFCMTokens = async (userId) => {
  try {
    // Try to get from fcm_tokens table
    const result = await pool.query(
      "SELECT token FROM fcm_tokens WHERE user_id = $1",
      [userId]
    );
    
    if (result.rows.length > 0) {
      return result.rows.map(row => row.token);
    }
    
    // Fallback: try to get from users table
    const userResult = await pool.query(
      "SELECT fcm_token FROM users WHERE id = $1 AND fcm_token IS NOT NULL",
      [userId]
    );
    
    if (userResult.rows.length > 0 && userResult.rows[0].fcm_token) {
      return [userResult.rows[0].fcm_token];
    }
    
    return [];
  } catch (error) {
    console.warn("Error getting FCM tokens:", error.message);
    return [];
  }
};

/**
 * Send bid notification (outbid, new bid, auction ending)
 * @param {number} userId - User ID to notify
 * @param {string} type - Notification type ('outbid', 'new_bid', 'auction_ending', 'auction_won')
 * @param {Object} productData - Product information
 * @param {Object} bidData - Bid information
 */
export const sendBidNotification = async (userId, type, productData, bidData = {}) => {
  try {
    const tokens = await getFCMTokens(userId);
    if (tokens.length === 0) {
      console.log(`No FCM tokens found for user ${userId}`);
      return;
    }

    let notification = {};
    let data = {
      type: type,
      product_id: productData.id?.toString(),
      product_title: productData.title,
    };

    switch (type) {
      case 'outbid':
        notification = {
          title: "You've been outbid!",
          body: `Someone placed a higher bid on ${productData.title}. Current bid: $${bidData.amount || productData.current_bid}`,
        };
        data.bid_amount = bidData.amount?.toString();
        break;

      case 'new_bid':
        notification = {
          title: "New bid placed",
          body: `A new bid was placed on ${productData.title}. Current bid: $${bidData.amount || productData.current_bid}`,
        };
        data.bid_amount = bidData.amount?.toString();
        break;

      case 'auction_ending':
        notification = {
          title: "Auction ending soon!",
          body: `${productData.title} auction ends in ${bidData.hours_left || 'a few'} hours`,
        };
        data.hours_left = bidData.hours_left?.toString();
        break;

      case 'auction_won':
        notification = {
          title: "🎉 You won the auction!",
          body: `Congratulations! You won ${productData.title} for $${bidData.amount || productData.current_bid}`,
        };
        data.bid_amount = bidData.amount?.toString();
        break;

      case 'product_approved':
        notification = {
          title: "✅ Product Approved!",
          body: `Your product "${productData.title}" has been approved and is now live`,
        };
        break;

      case 'product_rejected':
        notification = {
          title: "❌ Product Rejected",
          body: `Your product "${productData.title}" was rejected. ${bidData.reason ? `Reason: ${bidData.reason}` : ''}`,
        };
        if (bidData.reason) {
          data.reason = bidData.reason;
        }
        break;

      default:
        notification = {
          title: "Auction update",
          body: `Update on ${productData.title}`,
        };
    }

    await sendFCMNotificationToMultiple(tokens, notification, data);

    // Log notification in database
    await pool.query(
      `INSERT INTO notifications (type, title, message, user_id, read) 
       VALUES ($1, $2, $3, $4, false)`,
      [type, notification.title, notification.body, userId]
    );
  } catch (error) {
    console.error("Error sending bid notification:", error);
    // Don't throw - notification failure shouldn't break the main flow
  }
};

