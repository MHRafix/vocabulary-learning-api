import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { LessonService } from './lesson.service';

@Controller('lessons')
@ApiTags('Lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post('/create-lesson')
  create(@Body() createLessonDto: CreateLessonDto) {
    try {
      return this.lessonService.create(createLessonDto);
    } catch (error) {
      throw new ForbiddenException('Failed to create lesson.');
    }
  }

  @Get()
  findAll() {
    try {
      return this.lessonService.findAll();
    } catch (error) {
      throw new ForbiddenException('Failed to find lessons.');
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.lessonService.findOne(id);
    } catch (error) {
      throw new ForbiddenException('Failed to find lesson.');
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() payload: UpdateLessonDto) {
    try {
      await this.lessonService.update(id, payload);
      return { success: true, message: 'Lesson updated successfully.' };
    } catch (error) {
      throw new ForbiddenException('Failed to update lesson.');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.lessonService.remove(id);
      return { success: true, message: 'Lesson deleted successfully.' };
    } catch (error) {
      throw new ForbiddenException('Failed to delete lesson.');
    }
  }
}
