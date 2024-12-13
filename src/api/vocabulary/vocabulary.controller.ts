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
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';
import { UpdateVocabularyDto } from './dto/update-vocabulary.dto';
import { VocabularyService } from './vocabulary.service';

@Controller('vocabularies')
@ApiTags('Vocabulary')
export class VocabularyController {
  constructor(private readonly vocabularyService: VocabularyService) {}

  @Post('/create-vocabulary')
  @ApiBearerAuth()
  @ApiOperation({ description: 'Only admin can access ' })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  create(@Body() payload: CreateVocabularyDto) {
    try {
      return this.vocabularyService.create(payload);
    } catch (error) {
      throw new ForbiddenException('Failed to create vocabulary.');
    }
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ description: 'Anyone can access ' })
  @UseGuards(AuthGuard())
  findAll() {
    try {
      return this.vocabularyService.findAll();
    } catch (error) {
      throw new ForbiddenException('Failed to find vocabularies.');
    }
  }

  @Get('/findByLessonId/:id')
  @ApiBearerAuth()
  @ApiOperation({ description: 'Anyone can access ' })
  @UseGuards(AuthGuard())
  findByLessonId(@Param('id') id: string) {
    console.log(id);
    try {
      return this.vocabularyService.findAllByLessonId(id);
    } catch (error) {
      throw new ForbiddenException('Failed to find vocabularies.');
    }
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ description: 'Anyone can access ' })
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
    try {
      return this.vocabularyService.findOne(id);
    } catch (error) {
      throw new ForbiddenException('Failed to find vocabulary.');
    }
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ description: 'Only admin can access ' })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  async update(@Param('id') id: string, @Body() payload: UpdateVocabularyDto) {
    try {
      await this.vocabularyService.update(id, payload);
      return { success: true, message: 'Vocabulary updated successfully.' };
    } catch (error) {
      throw new ForbiddenException('Failed to update vocabulary.');
    }
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ description: 'Only admin can access ' })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  async remove(@Param('id') id: string) {
    try {
      await this.vocabularyService.remove(id);
      return { success: true, message: 'Vocabulary deleted successfully.' };
    } catch (error) {
      throw new ForbiddenException('Failed to delete vocabulary.');
    }
  }
}
