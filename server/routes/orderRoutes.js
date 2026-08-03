const express = require('express');
const router = express.Router();
const {
  checkoutOrder,
  getMyOrders,
  getOrderById,
  verifyExitCode,
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.post('/checkout', protect, checkoutOrder);
router.get('/my-orders', protect, getMyOrders);
router.post('/verify-exit', protect, verifyExitCode);
router.get('/:id', protect, getOrderById);

module.exports = router;