import mongoose, { Document, Model } from 'mongoose';

export interface IDish extends Document {
  name: string;
  slug: string;
  cuisine: string;
  description: string;
  ingredients: string[];
  instructions: string[];
}

const DishSchema = new mongoose.Schema<IDish>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  cuisine: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  instructions: [{ type: String, required: true }],
}, {
  timestamps: true,
});

const Dish: Model<IDish> = mongoose.models.Dish || mongoose.model<IDish>('Dish', DishSchema);

export default Dish;
