const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductByBarcode,
  getProductById,
} = require('../controllers/productController');

router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/barcode/:barcode', getProductByBarcode);
router.get('/:id', getProductById);

module.exports = router;