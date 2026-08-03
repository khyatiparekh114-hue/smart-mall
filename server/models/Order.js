const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderType: {
      type: String,
      enum: ['scan_and_go', 'pre_book'],
      required: true,
    },
    items: [orderItemSchema],
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    paymentId: {
      type: String,
    },

    // --- Scan & Go specific ---
    exitCode: {
      type: String,
    },

    // --- Pre-Book specific ---
    pickupSlot: {
      type: Date,
    },
    pickupCounter: {
      type: String,
    },
    orderStatus: {
      type: String,
      enum: ['placed', 'packed', 'ready_for_pickup', 'completed', 'cancelled'],
      default: 'placed',
    },
    exitVerified: {
  type: Boolean,
  default: false,
},
exitVerifiedAt: {
  type: Date,
},
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);