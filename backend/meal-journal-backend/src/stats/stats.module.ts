/* eslint-disable prettier/prettier */
 
 
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { StatsService } from './stats.service.ts';
import { StatsController } from './stats.controller.ts';
import { MongooseModule } from '@nestjs/mongoose';
import { MealSchema } from '../models/Meal.ts';
import { UserSchema } from '../models/User';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Meal', schema: MealSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
