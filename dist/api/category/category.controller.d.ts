import { CreateCategoryDto } from './category.dto';
import { CategoryService } from './category.service';
import { Category } from './category.interface';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createCategoryDto: CreateCategoryDto): Promise<void>;
    findById(id: string): Promise<Category>;
    findAll(): Promise<Category[]>;
}
