import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from '../authentication/authentication.module';
import { Lesson, LessonSchema } from './entities/lesson.entity';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Lesson.name, schema: LessonSchema }]),
    AuthenticationModule,
  ],
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}
