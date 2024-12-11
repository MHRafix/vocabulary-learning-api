import {
  Body,
  Controller,
  Delete,
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
import { Role } from '../authentication/entities/user.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { LessonService } from './lesson.service';

@Controller('lessons')
@ApiTags('Lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post('/create-lesson')
  @ApiBearerAuth()
  @ApiOperation({ description: 'Only admin can access ' })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  create(@Body() createLessonDto: CreateLessonDto) {
    try {
      return this.lessonService.create(createLessonDto);
    } catch (error) {
      throw new ForbiddenException('Failed to create lesson.');
    }
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ description: 'Anyone can access ' })
  @UseGuards(AuthGuard())
  findAll() {
    try {
      return this.lessonService.findAll();
    } catch (error) {
      throw new ForbiddenException('Failed to find lessons.');
    }
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ description: 'Anyone can access ' })
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
    try {
      return this.lessonService.findOne(id);
    } catch (error) {
      throw new ForbiddenException('Failed to find lesson.');
    }
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ description: 'Only admin can access ' })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  async update(@Param('id') id: string, @Body() payload: UpdateLessonDto) {
    try {
      await this.lessonService.update(id, payload);
      return { success: true, message: 'Lesson updated successfully.' };
    } catch (error) {
      throw new ForbiddenException('Failed to update lesson.');
    }
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ description: 'Only admin can access ' })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  async remove(@Param('id') id: string) {
    try {
      await this.lessonService.remove(id);
      return { success: true, message: 'Lesson deleted successfully.' };
    } catch (error) {
      throw new ForbiddenException('Failed to delete lesson.');
    }
  }
}
