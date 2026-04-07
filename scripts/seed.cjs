// CommonJS seed script - run with: node scripts/seed.cjs
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error('Missing MONGODB_URI in .env.local');

const DishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  cuisine: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: [{ type: String }],
  instructions: [{ type: String }],
}, { timestamps: true });

const Dish = mongoose.models?.Dish || mongoose.model('Dish', DishSchema);

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Connected to MongoDB');

  const rawData = fs.readFileSync(path.join(__dirname, '../seed_data.json'), 'utf-8');
  const dishes = JSON.parse(rawData);

  await Dish.deleteMany({});
  console.log('🗑️  Cleared existing dishes');

  await Dish.insertMany(dishes);
  const cuisineCount = new Set(dishes.map(d => d.cuisine)).size;
  console.log(`🍽️  Seeded ${dishes.length} dishes across ${cuisineCount} cuisines!`);

  await mongoose.disconnect();
  console.log('Done!');
}

seed().catch(e => { console.error(e); process.exit(1); });
