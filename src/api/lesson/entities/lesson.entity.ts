import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LessonDocument = Lesson & Document;

@Schema({ timestamps: true })
export class Lesson {
  @Prop({ required: true })
  title: string;

  @Prop({ unique: [true, 'Lesson is exist with this number'] })
  number: number;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
