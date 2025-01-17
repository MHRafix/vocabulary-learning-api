import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';
import { PaginationQueryDto } from './dto/pagination.dto';
import { UpdateVocabularyDto } from './dto/update-vocabulary.dto';
import { Vocabulary, VocabularyDocument } from './entities/vocabulary.entity';

@Injectable()
export class VocabularyService {
  constructor(
    @InjectModel(Vocabulary.name)
    private vocabularyModel: Model<VocabularyDocument>,
  ) {}

  /**
   * Create a new Vocabulary
   * @param payload CreateVocabularyDto
   * @returns
   */
  create(payload: CreateVocabularyDto) {
    return this.vocabularyModel.create(payload);
  }

  /**
   * Get all the vocabulary
   * @returns [Vocabulary]
   */
  findAll() {
    return this.vocabularyModel
      .find({})
      .populate('lessonNo', 'title number')
      .exec();
  }

  /**
   * Get single vocabulary
   * @param id object id
   * @returns
   */
  findOne(_id: string) {
    return this.vocabularyModel.findOne({ _id });
  }

  /**
   * find vocabulary by lesson id
   * @param id object id
   * @returns
   */
  async findByLessonId(id: string) {
    const vocabularies = await this.vocabularyModel.find({ lessonNo: id });
    return vocabularies.length;
  }

  /**
   * find vocabulary by lesson
   * @param id object id
   * @param page number
   * @param limit number
   * @returns
   */
  async findAllByLessonId(id: string, paginationQuery: PaginationQueryDto) {
    const { page = 1, limit = 1 } = paginationQuery;
    const skip = (page - 1) * limit;

    // data and total count
    const [vocabularies, total] = await Promise.all([
      this.vocabularyModel.find({lessonNo: id}).skip(skip).limit(limit).exec(),
      this.vocabularyModel.countDocuments().exec(),
    ]);
    return { vocabularies, total, hasNext: page * limit < total };
  }

  /**
   * update a single vocabulary
   * @param id objectId
   * @param updateVocabularyDto
   * @returns
   */
  async update(_id: string, payload: UpdateVocabularyDto) {
    // check document is exist or not
    const isExist = await this.vocabularyModel.findOne({ _id });

    // if not exist then throw forbidden err
    if (!isExist) {
      throw new ForbiddenException('Vocabulary not found.');
    }

    // update and return
    return this.vocabularyModel.findByIdAndUpdate(_id, payload);
  }

  /**
   * delete a vocabulary
   * @param _id onjectId
   * @returns
   */
  remove(_id: string) {
    return this.vocabularyModel.findByIdAndRemove(_id);
  }
}
