import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Dish from '../src/models/Dish';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

async function seed() {
  await mongoose.connect(MONGODB_URI!);
  console.log('Connected to MongoDB');

  // Load the generated JSON data
  const rawData = fs.readFileSync(path.join(__dirname, '../seed_data.json'), 'utf-8');
  const dishes = JSON.parse(rawData);

  // Clear all existing dishes
  await Dish.deleteMany({});
  console.log('Cleared existing dishes');

  // Insert all new dishes
  await Dish.insertMany(dishes);
  console.log(`Successfully seeded ${dishes.length} dishes across ${new Set(dishes.map((d: any) => d.cuisine)).size} cuisines!`);

  await mongoose.disconnect();
  console.log('Done!');
}

seed().catch(console.error);
