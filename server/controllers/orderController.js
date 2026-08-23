const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User'); 

const generateExitCode = () => {
  return 'EXIT-' + Math.floor(1000 + Math.random() * 9000);
};

// @desc    Checkout cart and create an order
// @route   POST /api/orders/checkout
const checkoutOrder = async (req, res) => {
  try {
    const { cartType, pickupSlot } = req.body;

    const cart = await Cart.findOne({
      user: req.user._id,
      cartType,
      isCheckedOut: false,
    }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    for (const item of cart.items) {
      if (item.product.stock < item.quantity) {
        return res.status(400).json({
          message: `${item.product.name} is out of stock`,
        });
      }
    }

    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      quantity: item.quantity,
      price: item.priceAtAddition,
    }));

    const totalAmount = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const orderData = {
      user: req.user._id,
      orderType: cartType,
      items: orderItems,
      totalAmount,
      paymentStatus: 'paid',
    };

    if (cartType === 'scan_and_go') {
      orderData.exitCode = generateExitCode();
    } else if (cartType === 'pre_book') {
      orderData.pickupSlot = pickupSlot || new Date();
      orderData.pickupCounter = 'Express Counter 1';
      orderData.orderStatus = 'placed';
    }

    const order = await Order.create(orderData);

    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.product._id, {
        $inc: { stock: -item.quantity },
      });
    }

    cart.isCheckedOut = true;
    await cart.save();

    // Award loyalty points: 1 point per ₹10 spent
const pointsEarned = Math.floor(totalAmount / 10);
await User.findByIdAndUpdate(req.user._id, {
  $inc: { loyaltyPoints: pointsEarned },
});

    res.status(201).json({ ...order.toObject(), pointsEarned });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged-in user's orders
// @route   GET /api/orders/my-orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single order by ID
// @route   GET /api/orders/:id
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Verify a Scan & Go exit code at the gate (staff use)
// @route   POST /api/orders/verify-exit
const verifyExitCode = async (req, res) => {
  try {
    const { exitCode } = req.body;

    if (!exitCode) {
      return res.status(400).json({ allowed: false, message: 'No exit code provided' });
    }

    const order = await Order.findOne({ exitCode, orderType: 'scan_and_go' }).populate(
      'user',
      'name email'
    );

    if (!order) {
      return res.status(404).json({ allowed: false, message: 'Invalid exit code — no matching order' });
    }

    if (order.paymentStatus !== 'paid') {
      return res.status(400).json({ allowed: false, message: 'Order is not paid for' });
    }

    if (order.exitVerified) {
      return res.status(400).json({
        allowed: false,
        message: `This code was already used at ${new Date(order.exitVerifiedAt).toLocaleString('en-IN')}`,
      });
    }

    order.exitVerified = true;
    order.exitVerifiedAt = new Date();
    await order.save();

    res.status(200).json({
      allowed: true,
      message: 'Exit approved',
      customerName: order.user?.name,
      items: order.items,
      totalAmount: order.totalAmount,
    });
  } catch (error) {
    res.status(500).json({ allowed: false, message: error.message });
  }
};

module.exports = { checkoutOrder, getMyOrders, getOrderById, verifyExitCode };