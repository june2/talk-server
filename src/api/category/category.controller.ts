import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { CreateCategoryDto } from './category.dto';
import { CategoryService } from './category.service';
import { Category } from './category.interface';

@ApiBearerAuth()
@ApiUseTags('Category')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {  
    this.categoryService.create(createCategoryDto);
  }

  @Get('/:id')  
  async findById(@Param('id') id: string): Promise<Category> {        
    return this.categoryService.findById(id);
  }

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }
}
