import admin from "../config/firebaseConfig.js";
import { getStorage } from "firebase-admin/storage";

/**
 * Upload file to Firebase Storage
 * @param {Buffer} fileBuffer - File buffer
 * @param {string} fileName - File name with path
 * @param {string} contentType - MIME type (e.g., 'image/jpeg')
 * @returns {Promise<string>} Public URL of uploaded file
 */
export const uploadFileToFirebase = async (fileBuffer, fileName, contentType) => {
  try {
    const bucket = getStorage().bucket();
    const file = bucket.file(fileName);

    // Upload file
    await file.save(fileBuffer, {
      metadata: {
        contentType: contentType,
        metadata: {
          uploadedAt: new Date().toISOString()
        }
      },
      public: true, // Make file publicly accessible
      validation: 'md5'
    });

    // Make file publicly readable
    await file.makePublic();

    // Get public URL
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
    
    return publicUrl;
  } catch (error) {
    console.error("Error uploading file to Firebase Storage:", error);
    throw new Error(`Failed to upload file: ${error.message}`);
  }
};

/**
 * Delete file from Firebase Storage
 * @param {string} fileName - File name with path
 */
export const deleteFileFromFirebase = async (fileName) => {
  try {
    const bucket = getStorage().bucket();
    const file = bucket.file(fileName);
    await file.delete();
    console.log(`File deleted: ${fileName}`);
  } catch (error) {
    console.error("Error deleting file from Firebase Storage:", error);
    // Don't throw - file might not exist
  }
};

/**
 * Get file URL from Firebase Storage path
 * @param {string} fileName - File name with path
 * @returns {string} Public URL
 */
export const getFileUrl = (fileName) => {
  const bucket = getStorage().bucket();
  return `https://storage.googleapis.com/${bucket.name}/${fileName}`;
};

