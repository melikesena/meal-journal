/* eslint-disable prettier/prettier */
import mongoose from 'mongoose';
import { User } from './models/User.ts';
import { Meal } from './models/Meal.ts';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/mealjournal';

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log('MongoDB connected');

  await User.deleteMany({});
  await Meal.deleteMany({});

  const user = new User({
    name: 'Ali',
    email: 'ali@example.com',
    password: '123456',
  });
  await user.save();

  const meal1 = new Meal({
    type: 'Breakfast',
    name: 'Omelette',
    portion: '2 eggs',
    userId: user._id,
  });
  const meal2 = new Meal({
    type: 'Lunch',
    name: 'Chicken Salad',
    portion: '200g',
    userId: user._id,
  });

  await meal1.save();
  await meal2.save();

  user.meals.push(meal1, meal2);
  await user.save();

  console.log('Seed completed!');
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
