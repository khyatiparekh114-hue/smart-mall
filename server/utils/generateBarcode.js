const Product = require('../models/product');

// Calculate the EAN-13 check digit for a 12-digit prefix
const calculateCheckDigit = (digits12) => {
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += Number(digits12[i]) * (i % 2 === 0 ? 1 : 3);
  }
  return String((10 - (sum % 10)) % 10);
};

// Generate a unique, valid EAN-13 barcode not already used in the database
const generateUniqueBarcode = async () => {
  const prefix = '890'; // Store/country prefix

  let barcode;
  let exists = true;

  while (exists) {
    // Random 9 digits after the prefix
    let middle = '';
    for (let i = 0; i < 9; i++) {
      middle += Math.floor(Math.random() * 10);
    }

    const first12 = prefix + middle;
    const checkDigit = calculateCheckDigit(first12);
    barcode = first12 + checkDigit;

    exists = await Product.findOne({ barcode });
  }

  return barcode;
};

module.exports = generateUniqueBarcode;