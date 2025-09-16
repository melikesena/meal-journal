/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDate } from 'class-validator';

export class CreateMealDto {
  @IsString()
  @IsNotEmpty()
  type: string; // örn: breakfast, lunch, dinner

  @IsString()
  @IsNotEmpty()
  name: string; // yemek adı

  @IsString()
  @IsNotEmpty()
  portion: string; // örn: "1 tabak", "2 dilim"

  @IsNumber()
  calories: number; // kalori miktarı

  @IsOptional()
  @IsDate()
  date?: Date;
}
