/* eslint-disable prettier/prettier */
import mongoose, { Schema, Document } from 'mongoose';
import { IMeal } from './Meal.ts';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  meals: IMeal[];
  dailyCalories?: number;
}

export const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  meals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }],
  dailyCalories: { type: Number, default: 2000 },
});

export const User = mongoose.model<IUser>('User', UserSchema);
