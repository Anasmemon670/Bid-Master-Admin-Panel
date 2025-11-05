import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// Initialize Firebase Admin SDK
// Option 1: Using service account JSON (recommended for production)
// Option 2: Using environment variables (for development)
let firebaseApp;

try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    // Parse service account from environment variable (JSON string)
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      databaseURL: process.env.FIREBASE_DATABASE_URL
    });
  } else if (process.env.FIREBASE_PROJECT_ID) {
    // Initialize with environment variables
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      databaseURL: process.env.FIREBASE_DATABASE_URL
    });
  } else {
    // Try to use default credentials (for Firebase Functions or local emulator)
    firebaseApp = admin.initializeApp({
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      databaseURL: process.env.FIREBASE_DATABASE_URL
    });
  }
  
  console.log("✅ Firebase Admin SDK initialized successfully");
} catch (error) {
  console.error("❌ Firebase Admin SDK initialization failed:", error.message);
  // Don't throw - allow app to run without Firebase (for development)
}

export default admin;
export { firebaseApp };

