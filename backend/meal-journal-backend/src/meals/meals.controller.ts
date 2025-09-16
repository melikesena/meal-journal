/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Query, UseGuards, Req } from '@nestjs/common';
import { MealsService } from './meals.service.ts';
import { CreateMealDto } from './dtos/create-meal.dto.ts';
import { JwtGuard } from '../common/guards/jwt.guard.ts';

@Controller('meals')
@UseGuards(JwtGuard)
export class MealsController {
  constructor(private readonly mealsService: MealsService) {}

  @Post()
  async create(@Body() dto: CreateMealDto, @Req() req: any) {
    return this.mealsService.create(dto, req.user.sub);
  }

   @Get()
  async findAll(@Req() req: any, @Query('day') day?: string) {
    let date: Date | undefined;
    if (day) {
      date = new Date(day);
    }
    return this.mealsService.findAllByUser(req.user.sub, date);
  }

  // Günlük toplam kalori (bugün veya opsiyonel gün)
  @Get('daily-calories')
  async getDailyCalories(@Req() req: any, @Query('day') day?: string) {
    let date = day ? new Date(day) : new Date();
    return this.mealsService.getDailyCalories(req.user.sub, date);
  }

  // Haftalık toplam kalori (opsiyonel başlangıç tarihi)
  @Get('weekly-calories')
  async getWeeklyCalories(@Req() req: any, @Query('weekStart') weekStart?: string) {
    let date = weekStart ? new Date(weekStart) : new Date();
    return this.mealsService.getWeeklyCalories(req.user.sub, date);
  }
}
