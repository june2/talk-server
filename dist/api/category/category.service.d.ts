import { Model } from 'mongoose';
import { CreateCategoryDto } from './category.dto';
import { Category } from './category.interface';
export declare class CategoryService {
    private readonly category;
    constructor(category: Model<Category>);
    create(createCategoryDto: CreateCategoryDto): Promise<Category>;
    findAll(): Promise<Category[]>;
    findById(id: string): Promise<Category>;
}
