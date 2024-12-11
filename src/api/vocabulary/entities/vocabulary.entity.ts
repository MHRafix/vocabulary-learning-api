import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Lesson } from 'src/api/lesson/entities/lesson.entity';

export type VocabularyDocument = Vocabulary & Document;

@Schema({ timestamps: true })
export class Vocabulary {
  @Prop({ required: true })
  word: string;

  @Prop({ required: true })
  meaning: string;

  @Prop({ required: true })
  pronunciation: string;

  @Prop({ required: true })
  whenToSay: string;

  @Prop({
    type: Types.ObjectId,
    ref: Lesson.name,
    required: true,
  })
  lessonNo: string;

  @Prop()
  adminEmail: string;
}

export const VocabularySchema = SchemaFactory.createForClass(Vocabulary);
