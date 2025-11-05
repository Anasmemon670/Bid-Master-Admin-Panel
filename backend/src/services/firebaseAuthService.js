import admin from "../config/firebaseConfig.js";
import pool from "../config/db.js";
import jwt from "jsonwebtoken";

/**
 * Verify Firebase ID token and return decoded token
 * @param {string} idToken - Firebase ID token from client
 * @returns {Promise<Object>} Decoded token with user info
 */
export const verifyFirebaseToken = async (idToken) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    return decodedToken;
  } catch (error) {
    console.error("Error verifying Firebase token:", error);
    throw new Error("Invalid Firebase token");
  }
};

/**
 * Get or create user in PostgreSQL from Firebase auth data
 * @param {Object} firebaseUser - Firebase user data
 * @param {string} role - User role (buyer/seller)
 * @returns {Promise<Object>} PostgreSQL user record
 */
export const syncUserWithPostgreSQL = async (firebaseUser, role = 'buyer') => {
  try {
    const { uid, email, phone_number, display_name } = firebaseUser;

    // Check if user exists
    let userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1 OR phone = $2",
      [email, phone_number]
    );

    if (userResult.rows.length > 0) {
      // User exists - update Firebase UID if not set and column exists
      const existingUser = userResult.rows[0];
      if (!existingUser.firebase_uid) {
        try {
          await pool.query(
            "UPDATE users SET firebase_uid = $1 WHERE id = $2",
            [uid, existingUser.id]
          );
        } catch (updateError) {
          // Column might not exist, ignore
          console.warn("Could not update firebase_uid:", updateError.message);
        }
      }
      return existingUser;
    }

    // Create new user (firebase_uid column may not exist, use ON CONFLICT if needed)
    let newUserResult;
    try {
      newUserResult = await pool.query(
        `INSERT INTO users (name, email, phone, role, status, firebase_uid) 
         VALUES ($1, $2, $3, $4, 'pending', $5) 
         RETURNING *`,
        [display_name || email?.split('@')[0] || 'User', email, phone_number, role, uid]
      );
    } catch (error) {
      // If firebase_uid column doesn't exist, create user without it
      if (error.message.includes('firebase_uid')) {
        newUserResult = await pool.query(
          `INSERT INTO users (name, email, phone, role, status) 
           VALUES ($1, $2, $3, $4, 'pending') 
           RETURNING *`,
          [display_name || email?.split('@')[0] || 'User', email, phone_number, role]
        );
        // Try to add firebase_uid in a separate update
        try {
          await pool.query(
            `UPDATE users SET firebase_uid = $1 WHERE id = $2`,
            [uid, newUserResult.rows[0].id]
          );
        } catch (updateError) {
          console.warn("Could not update firebase_uid:", updateError.message);
        }
      } else {
        throw error;
      }
    }

    return newUserResult.rows[0];
  } catch (error) {
    console.error("Error syncing user with PostgreSQL:", error);
    throw error;
  }
};

/**
 * Generate app JWT token after Firebase verification
 * @param {Object} user - PostgreSQL user record
 * @returns {string} JWT token
 */
export const generateAppJWT = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      phone: user.phone,
      role: user.role,
      firebase_uid: user.firebase_uid
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "30d" }
  );
};

/**
 * Get Firebase user by UID
 * @param {string} uid - Firebase UID
 * @returns {Promise<Object>} Firebase user record
 */
export const getFirebaseUser = async (uid) => {
  try {
    const userRecord = await admin.auth().getUser(uid);
    return userRecord;
  } catch (error) {
    console.error("Error getting Firebase user:", error);
    throw new Error("User not found in Firebase");
  }
};

