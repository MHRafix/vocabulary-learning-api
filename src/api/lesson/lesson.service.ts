import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson, LessonDocument } from './entities/lesson.entity';

@Injectable()
export class LessonService {
  constructor(
    @InjectModel(Lesson.name)
    private lessonModel: Model<LessonDocument>,
  ) {}

  /**
   *
   * @param payload CreateLessonDto
   * @returns
   */
  create(payload: CreateLessonDto) {
    return this.lessonModel.create(payload);
  }

  /**
   *
   * @returns [Lesson]
   */
  findAll() {
    return this.lessonModel.find({});
  }

  /**
   *
   * @param _id - object id
   * @returns
   */
  findOne(_id: string) {
    return this.lessonModel.find({ _id });
  }

  /**
   *
   * @param _id - object id
   * @param payload - UpdateLessonDto
   * @returns
   */
  async update(_id: string, payload: UpdateLessonDto) {
    // check lesson with this object id is exist or not
    const isExist = await this.lessonModel.findOne({ _id });

    // if not exist then throw forbidden exception
    if (!isExist) {
      throw new ForbiddenException(`No lesson found.`);
    }

    // if exist then update with the given payload
    return this.lessonModel.findByIdAndUpdate(_id, payload);
  }

  /**
   *
   * @param _id - string
   * @returns
   */
  remove(_id: string) {
    return this.lessonModel.findByIdAndRemove(_id);
  }
}
