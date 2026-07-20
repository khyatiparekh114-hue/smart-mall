const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dns = require('dns');
const Product = require('./models/Product');

dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config();

const products = [
  {
    name: 'Lays Chips 50g',
    barcode: '8901030826825',
    description: 'Classic salted potato chips',
    category: 'Snacks',
    price: 20,
    stock: 100,
    storeSection: 'Aisle 4',
  },
  {
    name: 'Coca-Cola 500ml',
    barcode: '8901030826832',
    description: 'Chilled soft drink',
    category: 'Beverages',
    price: 40,
    stock: 80,
    storeSection: 'Aisle 2',
  },
  {
    name: 'Maggi Noodles 70g',
    barcode: '8901030826849',
    description: 'Instant masala noodles',
    category: 'Instant Food',
    price: 15,
    stock: 150,
    storeSection: 'Aisle 3',
  },
  {
    name: 'Dove Soap 100g',
    barcode: '8901030826856',
    description: 'Moisturizing beauty bar',
    category: 'Personal Care',
    price: 55,
    stock: 60,
    storeSection: 'Aisle 6',
  },
  {
    name: 'Colgate Toothpaste 100g',
    barcode: '8901030826863',
    description: 'Cavity protection toothpaste',
    category: 'Personal Care',
    price: 65,
    stock: 70,
    storeSection: 'Aisle 6',
  },
  {
    name: 'Amul Butter 100g',
    barcode: '8901030826870',
    description: 'Fresh dairy butter',
    category: 'Dairy',
    price: 55,
    stock: 40,
    storeSection: 'Aisle 1',
  },
  {
    name: 'Britannia Biscuits 200g',
    barcode: '8901030826887',
    description: 'Crunchy glucose biscuits',
    category: 'Snacks',
    price: 30,
    stock: 90,
    storeSection: 'Aisle 4',
  },
  {
    name: 'Parle-G Biscuits 100g',
    barcode: '8901030826894',
    description: 'Classic milk biscuits',
    category: 'Snacks',
    price: 10,
    stock: 200,
    storeSection: 'Aisle 4',
  },
  {
    name: 'Tata Salt 1kg',
    barcode: '8901030826900',
    description: 'Iodized table salt',
    category: 'Grocery',
    price: 25,
    stock: 100,
    storeSection: 'Aisle 5',
  },
  {
    name: 'Fortune Sunflower Oil 1L',
    barcode: '8901030826917',
    description: 'Refined sunflower cooking oil',
    category: 'Grocery',
    price: 150,
    stock: 50,
    storeSection: 'Aisle 5',
  },
  {
    name: 'Surf Excel Detergent 1kg',
    barcode: '8901030826924',
    description: 'Stain removal detergent powder',
    category: 'Household',
    price: 120,
    stock: 45,
    storeSection: 'Aisle 7',
  },
  {
    name: 'Nescafe Coffee 50g',
    barcode: '8901030826931',
    description: 'Instant coffee powder',
    category: 'Beverages',
    price: 145,
    stock: 35,
    storeSection: 'Aisle 2',
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');

    // Insert only products that don't already exist (by barcode)
    for (const p of products) {
      const exists = await Product.findOne({ barcode: p.barcode });
      if (!exists) {
        await Product.create(p);
        console.log(`Added: ${p.name}`);
      } else {
        console.log(`Skipped (already exists): ${p.name}`);
      }
    }

    console.log('Seeding complete!');
    process.exit();
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
};

seedProducts();