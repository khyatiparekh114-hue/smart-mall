const Product = require('../models/product');
const generateUniqueBarcode = require('../utils/generateBarcode');

// @desc    Navo product banavo (Admin/Staff use kare)
// @route   POST /api/products
const createProduct = async (req, res) => {
  try {
    const barcode = await generateUniqueBarcode();

    const product = await Product.create({
      ...req.body,
      barcode,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 

// @desc    Badha products joi (list/browse mate — Pre-Book flow)
// @route   GET /api/products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Barcode thi ek product shodho (Scan & Go flow)
// @route   GET /api/products/barcode/:barcode
const getProductByBarcode = async (req, res) => {
  try {
    const product = await Product.findOne({ barcode: req.params.barcode });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Get a single product by its database ID
// @route   GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Delete a single product
// @route   DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted', product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete all products whose expiry date has passed
// @route   DELETE /api/products/expired/all
const deleteExpiredProducts = async (req, res) => {
  try {
    const now = new Date();
    const result = await Product.deleteMany({ expiryDate: { $lt: now } });

    res.status(200).json({
      message: `${result.deletedCount} expired product(s) removed`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all products, including expired ones (Admin panel use)
// @route   GET /api/products/admin/all
const getAllProductsAdmin = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createProduct,
  getAllProducts,
  getProductByBarcode,
  getProductById,
  deleteProduct,
  deleteExpiredProducts,
  getAllProductsAdmin,
};