import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';

@Controller('authentication')
@ApiTags('Authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @ApiOperation({ description: 'Signup api' })
  @Post('/signup')
  signUp(@Body() payload: RegistrationDto) {
    return this.authService.signUp(payload);
  }

  @ApiOperation({ description: 'Login api' })
  @Post('/signin')
  signIn(@Body() payload: LoginDto) {
    return this.authService.signIn(payload);
  }
}
