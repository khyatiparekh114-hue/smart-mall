const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductByBarcode,
  getProductById,
  deleteProduct,
  deleteExpiredProducts,
  getAllProductsAdmin,
} = require('../controllers/productController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.post('/', protect, isAdmin, createProduct);
router.get('/', getAllProducts);
router.get('/admin/all', protect, isAdmin, getAllProductsAdmin);
router.delete('/expired/all', protect, isAdmin, deleteExpiredProducts);
router.get('/barcode/:barcode', getProductByBarcode);
router.delete('/:id', protect, isAdmin, deleteProduct);
router.get('/:id', getProductById);

module.exports = router;