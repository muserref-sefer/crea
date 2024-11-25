import mongoose, { Document, Schema } from 'mongoose';

interface Review {
  user: string; 
  review: string;
  rating: number; 
  createdAt: Date;
}

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  reviews: Review[]; 
  averageRating: number; 
}

const ReviewSchema = new Schema<Review>(
  {
    user: { type: String, required: true },
    review: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    reviews: [ReviewSchema], 
    averageRating: { type: Number, default: 0 }, 
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>('Product', ProductSchema);