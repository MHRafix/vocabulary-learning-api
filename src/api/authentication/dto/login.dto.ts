import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

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
