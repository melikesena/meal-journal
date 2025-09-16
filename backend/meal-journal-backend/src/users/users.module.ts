/* eslint-disable prettier/prettier */
 
 
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service.ts';
import { UsersController } from './users.controller.ts';
import { UserSchema } from '../models/User.ts'; // senin User modelinin yolu

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
