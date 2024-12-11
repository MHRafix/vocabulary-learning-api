import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from '../entities/user.entity';

export class LoginDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please type a valid email!' })
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Password should have minimum 8 letters!' })
  @MaxLength(20, { message: 'Password should have less than 20 letters!' })
  password: string;
}

export class UpdateRoleDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
