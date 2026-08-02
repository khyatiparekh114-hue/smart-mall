const express = require('express');
const router = express.Router();
const { getCart, addToCart, removeFromCart, updateCartItem } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:cartType', protect, getCart);
router.post('/add', protect, addToCart);
router.put('/update', protect, updateCartItem);
router.delete('/remove/:productId', protect, removeFromCart);

module.exports = router;