import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from '../entities/user.entity';

export class RegistrationDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please type a valid email!' })
  email: string;

  @ApiProperty({ required: false, default: Role.Learner })
  @IsOptional()
  @IsEnum(Role)
  role: Role.Learner;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  avatar: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Password should have minimum 8 letters!' })
  @MaxLength(20, { message: 'Password should have less than 20 letters!' })
  password: string;
}
