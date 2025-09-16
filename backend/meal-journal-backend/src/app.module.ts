/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
 import { Module } from '@nestjs/common';
import { AppController } from './app.controller.ts';
import { AppService } from './app.service.ts';
import { AuthModule } from './auth/auth.module.ts';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module.ts';
import { MealsModule } from './meals/meals.module.ts';
import { StatsModule } from './stats/stats.module.ts';
import { ConfigModule } from '@nestjs/config';





@Module({
  imports: [
     
    MongooseModule.forRoot('mongodb://localhost:27017/mealjournal'),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    MealsModule,
    StatsModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
