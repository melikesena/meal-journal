/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMeal } from '../models/Meal.ts';



@Injectable()
export class StatsService {
  constructor(@InjectModel('Meal') private mealModel: Model<IMeal>, @InjectModel('User') private userModel: Model<any>,) {}

  // Kullanıcının tüm meal sayısını döner
  async getTotalMeals(userId: string) {
    const count = await this.mealModel.countDocuments({ userId });
    return { totalMeals: count };
  }

  // Kullanıcının meal türlerine göre sayısı
  async getMealTypeStats(userId: string) {
    const result = await this.mealModel.aggregate([
      { $match: { userId: new (require('mongoose').Types.ObjectId)(userId) } },
      { $group: { _id: '$type', count: { $sum: 1 } } },
    ]);
    return result.map(r => ({ type: r._id, count: r.count }));
  }

 async getCaloriesTrend(userId: string, start?: string, end?: string) {
    const match: any = { userId: new (require('mongoose').Types.ObjectId)(userId) };

    if (start && end) {
      match.date = {
        $gte: new Date(start),
        $lte: new Date(end),
      };
    }
    const result = await this.mealModel.aggregate([
      { $match: match },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          totalCalories: { $sum: '$calories' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    return result.map(r => ({ date: r._id, calories: r.totalCalories }));
  }
  // En çok yenen yemek

   async getFavoriteMeal(userId: string) {
    const result = await this.mealModel.aggregate([
      { $match: { userId: new (require('mongoose').Types.ObjectId)(userId) } },
      { $group: { _id: '$name', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    if (result.length === 0) return { favoriteMeal: null, count: 0 };
    return { favoriteMeal: result[0]._id, count: result[0].count };
  }

  // 🎯 Günlük hedef karşılaştırması (son 7 gün)
  async getDailyVsTarget(userId: string) {
    const user = await this.userModel.findById(userId);
    const target = user?.dailyCalories || 2000;

    const last7days = new Date();
    last7days.setDate(last7days.getDate() - 7);

    const result = await this.mealModel.aggregate([
      {
        $match: {
          userId: new (require('mongoose').Types.ObjectId)(userId),
          date: { $gte: last7days },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          totalCalories: { $sum: '$calories' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    return result.map(r => ({
      date: r._id,
      consumed: r.totalCalories,
      target,
      difference: r.totalCalories - target,
    }));
  }



}
