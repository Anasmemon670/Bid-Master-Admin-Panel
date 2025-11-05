import pool from "../config/db.js";
import { uploadFileToFirebase } from "../services/firebaseStorageService.js";
import { initializeProductInFirestore } from "../services/firestoreService.js";
import multer from "multer";

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

export const MobileProductController = {
  // POST /api/products/create
  // Expects multipart/form-data with image file or image_url in body
  async createProduct(req, res) {
    try {
      const { title, description, image_url, startingPrice, duration, category_id } = req.body;
      const sellerId = req.user.id;
      const file = req.file; // Multer file object

      if (!title || !startingPrice) {
        return res.status(400).json({
          success: false,
          message: "Title and starting price are required"
        });
      }

      // Validate seller role
      if (req.user.role !== 'seller') {
        return res.status(403).json({
          success: false,
          message: "Only sellers can create products"
        });
      }

      // Calculate auction end time (duration in days, default 7 days)
      const days = duration || 7;
      const auctionEndTime = new Date();
      auctionEndTime.setDate(auctionEndTime.getDate() + days);

      let imageUrlValue = null;

      // Handle image upload to Firebase Storage if file is provided
      if (file) {
        try {
          const fileName = `products/${sellerId}/${Date.now()}_${file.originalname}`;
          imageUrlValue = await uploadFileToFirebase(
            file.buffer,
            fileName,
            file.mimetype
          );
        } catch (uploadError) {
          console.error("Error uploading image to Firebase:", uploadError);
          return res.status(500).json({
            success: false,
            message: "Failed to upload image"
          });
        }
      } else if (image_url) {
        // Use provided image URL (can be JSON stringified array or single URL)
        imageUrlValue = Array.isArray(image_url) ? JSON.stringify(image_url) : image_url;
      }

      // Create product with status 'pending'
      const result = await pool.query(
        `INSERT INTO products 
         (seller_id, title, description, image_url, starting_price, starting_bid, 
          current_price, current_bid, status, auction_end_time, category_id) 
         VALUES ($1, $2, $3, $4, $5, $5, $5, $5, 'pending', $6, $7) 
         RETURNING *`,
        [sellerId, title, description || null, imageUrlValue, startingPrice, auctionEndTime, category_id || null]
      );

      const product = result.rows[0];

      // Initialize product in Firestore for real-time updates
      try {
        await initializeProductInFirestore(product);
      } catch (firestoreError) {
        console.warn("Failed to initialize product in Firestore:", firestoreError);
        // Don't fail the request if Firestore fails
      }

      res.status(201).json({
        success: true,
        message: "Product created successfully and pending approval",
        data: product
      });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  },

  // Multer middleware for file upload
  uploadMiddleware: upload.single('image'),

  // GET /api/products/mine
  async getMyProducts(req, res) {
    try {
      const userId = req.user.id;
      const { status } = req.query;

      let query = `
        SELECT p.*, c.name as category_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.seller_id = $1
      `;
      const params = [userId];

      if (status) {
        query += ` AND p.status = $2`;
        params.push(status);
      }

      query += ` ORDER BY p.created_at DESC`;

      const result = await pool.query(query, params);

      res.json({
        success: true,
        data: result.rows
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  },

  // GET /api/products (public - approved/live products)
  async getAllProducts(req, res) {
    try {
      const { category, search, page = 1, limit = 20 } = req.query;

      let query = `
        SELECT 
          p.*,
          u.name as seller_name,
          c.name as category_name,
          buyer.name as highest_bidder_name,
          EXTRACT(EPOCH FROM (p.auction_end_time - NOW())) / 3600 as hours_left
        FROM products p
        LEFT JOIN users u ON p.seller_id = u.id
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN users buyer ON p.highest_bidder_id = buyer.id
        WHERE p.status = 'approved'
      `;
      const params = [];
      let paramCount = 1;

      if (category) {
        query += ` AND p.category_id = $${paramCount++}`;
        params.push(category);
      }

      if (search) {
        query += ` AND (p.title ILIKE $${paramCount++} OR p.description ILIKE $${paramCount})`;
        params.push(`%${search}%`, `%${search}%`);
        paramCount++;
      }

      query += ` ORDER BY p.created_at DESC LIMIT $${paramCount++} OFFSET $${paramCount}`;
      params.push(parseInt(limit), (parseInt(page) - 1) * parseInt(limit));

      const result = await pool.query(query, params);

      // Get total count
      const countQuery = `
        SELECT COUNT(*) FROM products 
        WHERE status = 'approved'
        ${category ? `AND category_id = ${category}` : ''}
        ${search ? `AND (title ILIKE '%${search}%' OR description ILIKE '%${search}%')` : ''}
      `;
      const countResult = await pool.query(countQuery);

      res.json({
        success: true,
        data: result.rows,
        pagination: {
          total: parseInt(countResult.rows[0].count),
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(countResult.rows[0].count / limit)
        }
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  },

  // GET /api/products/:id
  async getProductById(req, res) {
    try {
      const { id } = req.params;

      const result = await pool.query(
        `SELECT 
          p.*,
          u.name as seller_name,
          u.email as seller_email,
          u.phone as seller_phone,
          c.name as category_name,
          buyer.name as highest_bidder_name,
          buyer.email as highest_bidder_email,
          EXTRACT(EPOCH FROM (p.auction_end_time - NOW())) / 3600 as hours_left,
          CASE 
            WHEN p.auction_end_time > NOW() THEN 'live'
            ELSE 'ended'
          END as auction_status
        FROM products p
        LEFT JOIN users u ON p.seller_id = u.id
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN users buyer ON p.highest_bidder_id = buyer.id
        WHERE p.id = $1`,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Product not found"
        });
      }

      res.json({
        success: true,
        data: result.rows[0]
      });
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  }
};

