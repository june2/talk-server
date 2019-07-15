import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './category.dto';
import { Category } from './category.interface';

@Injectable()
export class CategoryService {
  constructor(@Inject('category') private readonly category: Model<Category>) { }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const createdCat = new this.category(createCategoryDto);
    return await createdCat.save();
  }

  async findAll(): Promise<Category[]> {
    return await this.category.find().exec();
  }

  async findById(id: string): Promise<Category> {
    return await this.category.findById(id).populate('parent_id').exec();
  }
}
