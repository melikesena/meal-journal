/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMeal } from '../models/Meal.ts';
import { CreateMealDto } from './dtos/create-meal.dto.ts';

@Injectable()
export class MealsService {
  constructor(@InjectModel('Meal') private readonly mealModel: Model<IMeal>) {}

  async create(dto: CreateMealDto, userId: string) {
    const meal = new this.mealModel({ ...dto, userId });
    return meal.save();
  }

  async findAllByUser(userId: string, day?: Date) {
  let filter: any = { userId };
  if (day) {
    const start = new Date(day); start.setHours(0,0,0,0);
    const end = new Date(day); end.setHours(23,59,59,999);
    filter.date = { $gte: start, $lte: end };
  }
  return this.mealModel.find(filter).exec();
}

  async getDailyCalories(userId: string, day: Date = new Date()) {
  const start = new Date(day);
  start.setHours(0,0,0,0);
  const end = new Date(day);
  end.setHours(23,59,59,999);

  const meals = await this.mealModel.find({
    userId,
    date: { $gte: start, $lte: end }
  });

  return meals.reduce((total, meal) => total + (meal.calories || 0), 0);
}

async getWeeklyCalories(userId: string, weekStart: Date = new Date()) {
  const start = new Date(weekStart);
  start.setDate(start.getDate() - start.getDay()); // haftanın başlangıcı (Pazar)
  start.setHours(0,0,0,0);

  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  end.setHours(23,59,59,999);

  const meals = await this.mealModel.find({
    userId,
    date: { $gte: start, $lte: end }
  });

  return meals.reduce((total, meal) => total + (meal.calories || 0), 0);
}
}
