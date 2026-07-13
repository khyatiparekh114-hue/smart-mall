const express = require('express');
const router = express.Router();
const {
  checkoutOrder,
  getMyOrders,
  getOrderById,
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.post('/checkout', protect, checkoutOrder);
router.get('/my-orders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);

module.exports = router;