const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductByBarcode,
} = require('../controllers/productController');

router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/barcode/:barcode', getProductByBarcode);

module.exports = router;