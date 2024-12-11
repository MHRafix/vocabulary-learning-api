import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';
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
