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
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';
import { UpdateVocabularyDto } from './dto/update-vocabulary.dto';
import { VocabularyService } from './vocabulary.service';

@Controller('vocabularies')
@ApiTags('Vocabulary')
export class VocabularyController {
  constructor(private readonly vocabularyService: VocabularyService) {}

  @Post('/create-vocabulary')
  create(@Body() payload: CreateVocabularyDto) {
    try {
      return this.vocabularyService.create(payload);
    } catch (error) {
      throw new ForbiddenException('Failed to create vocabulary.');
    }
  }

  @Get()
  findAll() {
    try {
      return this.vocabularyService.findAll();
    } catch (error) {
      throw new ForbiddenException('Failed to find vocabularies.');
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.vocabularyService.findOne(id);
    } catch (error) {
      throw new ForbiddenException('Failed to find vocabulary.');
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() payload: UpdateVocabularyDto) {
    try {
      await this.vocabularyService.update(id, payload);
      return { success: true, message: 'Vocabulary updated successfully.' };
    } catch (error) {
      throw new ForbiddenException('Failed to update vocabulary.');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.vocabularyService.remove(id);
      return { success: true, message: 'Vocabulary deleted successfully.' };
    } catch (error) {
      throw new ForbiddenException('Failed to delete vocabulary.');
    }
  }
}
