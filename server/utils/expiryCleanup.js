const Product = require('../models/product');

const removeExpiredProducts = async () => {
  try {
    const now = new Date();
    const result = await Product.deleteMany({ expiryDate: { $lt: now } });

    if (result.deletedCount > 0) {
      console.log(`🗑️  Auto-removed ${result.deletedCount} expired product(s)`);
    }
  } catch (error) {
    console.error('Expiry cleanup error:', error.message);
  }
};

module.exports = removeExpiredProducts;