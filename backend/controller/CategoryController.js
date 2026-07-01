const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const Category = require("../model/Category");
require('dotenv').config(); // .env file load karne ke liye

// --- CLOUDINARY CONFIGURATION ---
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || 'djprilnpn',
  api_key: process.env.CLOUD_API_KEY || '621695583687777',
  api_secret: process.env.CLOUD_API_SECRET || 'd4IoBJf2UUrdq9Ilc5aK41DiIr0'
});

// --- STORAGE SETUP (Direct to Cloudinary) ---
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const isPDF = file.mimetype === 'application/pdf' || file.originalname.toLowerCase().endsWith('.pdf');

    // Special characters [ ] ( ) spaces sab _ se replace karo
    const cleanName = file.originalname
      .split('.')[0]
      .replace(/[^a-zA-Z0-9_-]/g, '_');

    return {
      folder: 'sr-web-uploads',
      resource_type: isPDF ? 'raw' : 'image',
      format: isPDF ? 'pdf' : undefined,
      public_id: cleanName + "_" + Date.now(), // cleanName use karo
    };
  },
});


const upload = multer({ storage: storage });

class CategoryController {
  // 1. Add Category
  static async addCategory(req, res) {
    try {
      const { title, description } = req.body;

      if (!req.file) {
        return res.status(400).json({ success: false, message: "Image upload fail !" });
      }

      // req.file.path mein ab Cloudinary ka link (https://res.cloudinary.com/...) aayega
      const imageUrl = req.file.path;

      const newCategory = new Category({
        title,
        description,
        image: imageUrl, // Pura URL DB mein save hoga
      });

      await newCategory.save();

      res.status(201).json({
        success: true,
        message: "Category added successfully!",
        data: newCategory,
      });
    } catch (error) {
      console.error("Cloudinary Error:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // 2. Get All Categories (Home Page ke liye)
  static async getCategories(req, res) {
    try {
      const categories = await Category.find().sort({ createdAt: -1 });
      res.status(200).json({ success: true, data: categories });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const { title, description } = req.body;

      // Purana data dhundo
      let category = await Category.findById(id);
      if (!category) return res.status(404).json({ success: false, message: "Category not found!" });

      // Agar user ne nayi image upload ki hai toh uska path lo, warna purana hi rehne do
      const imagePath = req.file ? req.file.path : category.image;

      const updatedData = {
        title,
        description,
        image: imagePath
      };

      const updatedCategory = await Category.findByIdAndUpdate(id, updatedData, { new: true });

      res.status(200).json({
        success: true,
        message: "Category updated successfully!",
        data: updatedCategory
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

// Dono cheezein export karein
module.exports = { CategoryController, upload };