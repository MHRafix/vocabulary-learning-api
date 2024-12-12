import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/app/decorators/role.decorator';
import { RolesGuard } from 'src/app/guards/role-guard';
import { AuthenticationService } from './authentication.service';
import { LoginDto, UpdateRoleDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { Role } from './entities/user.entity';

@Controller('authentication')
@ApiTags('Authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @ApiOperation({ description: 'Signup api' })
  @Post('/signup')
  signUp(@Body() payload: RegistrationDto) {
    try {
      return this.authService.signUp(payload);
    } catch (error) {
      throw new ForbiddenException('Failed to sign up.');
    }
  }

  @ApiOperation({ description: 'Login api' })
  @Post('/signin')
  signIn(@Body() payload: LoginDto) {
    try {
      return this.authService.signIn(payload);
    } catch (error) {
      throw new ForbiddenException('Failed to sign in.');
    }
  }

  @Get('/users')
  @ApiBearerAuth()
  @ApiOperation({ description: 'Logged in user can access ' })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  findAll() {
    try {
      return this.authService.findAll();
    } catch (error) {
      throw new ForbiddenException('Failed to find user.');
    }
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ description: 'Logged in user can access ' })
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
    try {
      return this.authService.findOne(id);
    } catch (error) {
      throw new ForbiddenException('Failed to find user.');
    }
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ description: 'Only admin can access ' })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  async updateRole(@Param('id') id: string, @Body() payload: UpdateRoleDto) {
    try {
      await this.authService.updateRole(id, payload);
      return {
        success: true,
        message: 'Role updated successfully.',
      };
    } catch (error) {
      throw new ForbiddenException(error?.message);
    }
  }
}
