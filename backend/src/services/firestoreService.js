import admin from "../config/firebaseConfig.js";

const db = admin.firestore();

/**
 * Update product bid in Firestore for real-time updates
 * @param {number} productId - Product ID
 * @param {Object} bidData - Bid data (amount, bidder_id, bidder_name, timestamp)
 */
export const updateProductBidInFirestore = async (productId, bidData) => {
  try {
    if (!db) {
      console.warn("Firestore not initialized, skipping update");
      return;
    }
    const productRef = db.collection('products').doc(productId.toString());
    
    await productRef.set({
      current_bid: bidData.amount,
      highest_bidder_id: bidData.bidder_id,
      highest_bidder_name: bidData.bidder_name,
      last_bid_time: admin.firestore.FieldValue.serverTimestamp(),
      total_bids: admin.firestore.FieldValue.increment(1),
      updated_at: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });

    // Add bid to bids subcollection for history
    await productRef.collection('bids').add({
      amount: bidData.amount,
      bidder_id: bidData.bidder_id,
      bidder_name: bidData.bidder_name,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log(`Updated product ${productId} bid in Firestore`);
  } catch (error) {
    console.error("Error updating Firestore:", error);
    // Don't throw - Firestore update failure shouldn't break main flow
  }
};

/**
 * Update product auction end time in Firestore
 * @param {number} productId - Product ID
 * @param {Date} endTime - Auction end time
 */
export const updateAuctionEndTimeInFirestore = async (productId, endTime) => {
  try {
    if (!db) {
      console.warn("Firestore not initialized, skipping update");
      return;
    }
    const productRef = db.collection('products').doc(productId.toString());
    
    await productRef.set({
      auction_end_time: admin.firestore.Timestamp.fromDate(endTime),
      updated_at: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });

    console.log(`Updated product ${productId} auction end time in Firestore`);
  } catch (error) {
    console.error("Error updating Firestore auction end time:", error);
  }
};

/**
 * Update product status in Firestore
 * @param {number} productId - Product ID
 * @param {string} status - Product status
 */
export const updateProductStatusInFirestore = async (productId, status) => {
  try {
    if (!db) {
      console.warn("Firestore not initialized, skipping update");
      return;
    }
    const productRef = db.collection('products').doc(productId.toString());
    
    await productRef.set({
      status: status,
      updated_at: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });

    console.log(`Updated product ${productId} status in Firestore`);
  } catch (error) {
    console.error("Error updating Firestore product status:", error);
  }
};

/**
 * Get product data from Firestore
 * @param {number} productId - Product ID
 * @returns {Promise<Object|null>} Product data or null
 */
export const getProductFromFirestore = async (productId) => {
  try {
    if (!db) {
      return null;
    }
    const productRef = db.collection('products').doc(productId.toString());
    const doc = await productRef.get();
    
    if (doc.exists) {
      return { id: doc.id, ...doc.data() };
    }
    return null;
  } catch (error) {
    console.error("Error getting product from Firestore:", error);
    return null;
  }
};

/**
 * Initialize product in Firestore when created
 * @param {Object} productData - Product data from PostgreSQL
 */
export const initializeProductInFirestore = async (productData) => {
  try {
    if (!db) {
      console.warn("Firestore not initialized, skipping product initialization");
      return;
    }
    const productRef = db.collection('products').doc(productData.id.toString());
    
    await productRef.set({
      id: productData.id,
      title: productData.title,
      description: productData.description,
      starting_bid: productData.starting_bid || productData.starting_price,
      current_bid: productData.current_bid || productData.starting_bid || productData.starting_price,
      seller_id: productData.seller_id,
      status: productData.status,
      auction_end_time: productData.auction_end_time 
        ? admin.firestore.Timestamp.fromDate(new Date(productData.auction_end_time))
        : null,
      image_url: productData.image_url,
      created_at: admin.firestore.FieldValue.serverTimestamp(),
      updated_at: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log(`Initialized product ${productData.id} in Firestore`);
  } catch (error) {
    console.error("Error initializing product in Firestore:", error);
  }
};

