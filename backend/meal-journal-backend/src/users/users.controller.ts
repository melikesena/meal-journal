/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Controller, Get, Put, Body, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service.ts';
import { JwtGuard } from '../common/guards/jwt.guard.ts';
import { UpdateUserDto } from './dtos/update-user.dto.ts';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  async getMe(@Req() req) {
    const userId = req.user.sub; // JwtGuard'dan gelen payload
    return this.usersService.findById(userId);
  }

  @UseGuards(JwtGuard)
  @Put('me')
  async updateMe(@Req() req, @Body() dto: UpdateUserDto) {
    const userId = req.user.sub;
    return this.usersService.updateUser(userId, dto);
  }
}
