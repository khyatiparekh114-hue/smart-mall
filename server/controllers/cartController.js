const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Get logged-in user's active cart (by cartType)
// @route   GET /api/cart/:cartType
const getCart = async (req, res) => {
  try {
    const { cartType } = req.params;

    let cart = await Cart.findOne({
      user: req.user._id,
      cartType,
      isCheckedOut: false,
    }).populate('items.product');

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        cartType,
        items: [],
      });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart/add
const addToCart = async (req, res) => {
  try {
    const { productId, quantity, cartType } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({
      user: req.user._id,
      cartType,
      isCheckedOut: false,
    });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        cartType,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      cart.items.push({
        product: productId,
        quantity: quantity || 1,
        priceAtAddition: product.price,
      });
    }

    await cart.save();

    const updatedCart = await Cart.findById(cart._id).populate('items.product');
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove/:productId
const removeFromCart = async (req, res) => {
  try {
    const { cartType } = req.body;

    const cart = await Cart.findOne({
      user: req.user._id,
      cartType,
      isCheckedOut: false,
    });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== req.params.productId
    );

    await cart.save();

    const updatedCart = await Cart.findById(cart._id).populate('items.product');
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update quantity of an item in cart
// @route   PUT /api/cart/update
const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity, cartType } = req.body;

    const cart = await Cart.findOne({
      user: req.user._id,
      cartType,
      isCheckedOut: false,
    });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find((i) => i.product.toString() === productId);

    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter((i) => i.product.toString() !== productId);
    } else {
      item.quantity = quantity;
    }

    await cart.save();

    const updatedCart = await Cart.findById(cart._id).populate('items.product');
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { getCart, addToCart, removeFromCart, updateCartItem };