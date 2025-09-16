/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service.ts';
import { AuthController } from './auth.controller.ts';
import { UserSchema } from '../models/User.ts';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
