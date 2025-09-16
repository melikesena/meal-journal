/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Controller, Get, Req, UseGuards, Query } from '@nestjs/common';
import { StatsService } from './stats.service.ts';
import { JwtGuard } from '../common/guards/jwt.guard.ts';

@Controller('meals/stats')
export class StatsController {
  constructor(private statsService: StatsService) {}

  @UseGuards(JwtGuard)
  @Get('total')
  async getTotal(@Req() req) {
    return this.statsService.getTotalMeals(req.user.sub);
  }

  @UseGuards(JwtGuard)
  @Get('types')
  async getByType(@Req() req) {
    return this.statsService.getMealTypeStats(req.user.sub);
  }

  // 📈 Günlük kalori trendi (tarih aralığı parametreli)
  @UseGuards(JwtGuard)
  @Get('calories-trend')
  async getCaloriesTrend(
    @Req() req,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.statsService.getCaloriesTrend(req.user.sub, startDate, endDate);
  }

  // ⭐ En çok yenen yemek
  @UseGuards(JwtGuard)
  @Get('favorite-meal')
  getFavoriteMeal(@Req() req) {
    return this.statsService.getFavoriteMeal(req.user.sub);
  }

  // 🎯 Günlük hedef karşılaştırması (son 7 gün için)
  @UseGuards(JwtGuard)
  @Get('daily-vs-target')
  async getDailyVsTarget(@Req() req) {
    return this.statsService.getDailyVsTarget(req.user.sub);
  }
}
