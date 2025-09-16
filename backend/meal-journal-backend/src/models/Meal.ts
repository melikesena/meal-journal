/* eslint-disable prettier/prettier */
import mongoose, { Schema, Document } from 'mongoose';

export interface IMeal extends Document {
  type: string;
  name: string;
  portion: string;
  userId: mongoose.Types.ObjectId;
  calories: number;
  date: Date;
}

export const MealSchema: Schema = new Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  portion: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  calories: { type: Number, required: true },
  date: { type: Date, required: true, default: () => new Date() } 
});

export const Meal = mongoose.model<IMeal>('Meal', MealSchema);