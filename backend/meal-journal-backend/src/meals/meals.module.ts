/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MealsService } from './meals.service.ts';
import { MealsController } from './meals.controller.ts';
import { MongooseModule } from '@nestjs/mongoose';
import { MealSchema } from '../models/Meal.ts'; // modeli buradan alacağız

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Meal', schema: MealSchema }]),
  ],
  controllers: [MealsController],
  providers: [MealsService],
})
export class MealsModule {}
