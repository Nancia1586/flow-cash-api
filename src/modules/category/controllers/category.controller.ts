import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ErrorMessage } from '@/types/errors/errorHttp';
import { CategoryService } from '../services/category.service';
import { TSwaggerCategory } from '@/types/swaggers';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { TCategory } from '@/types';
import { FetchCategoriesByDto } from '../dtos/fetch-categories-by.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
@Controller('categories')
@ApiTags('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({
    summary: 'Create category',
  })
  @ApiResponse({
    status: 200,
    description: 'Category created successfully',
    type: TSwaggerCategory,
  })
  @ApiResponse({
    status: 500,
    description: 'Error while creating category',
  })
  @ApiResponse({
    status: 400,
    description: `Error while creating category: ${ErrorMessage.BAD_REQUEST}`,
  })
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<TCategory> {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Put('/:categoryId')
  @ApiOperation({ summary: 'Update category' })
  @ApiResponse({
    status: 200,
    description: 'Category updated successfully',
    type: TSwaggerCategory,
  })
  @ApiResponse({
    status: 500,
    description: `Error while updating category:${ErrorMessage.UNKNOW_ERROR}`,
  })
  async updateCategory(
    @Param('categoryId') categoryId: string,
    @Body(new ValidationPipe()) body: UpdateCategoryDto,
  ): Promise<TCategory> {
    return this.categoryService.updateCategory(categoryId, body);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Categories fetched successfully',
    type: [TSwaggerCategory],
  })
  @ApiResponse({
    status: 500,
    description: 'Error while fetching categories',
  })
  @ApiResponse({
    status: 400,
    description: `Error while fetching categories: ${ErrorMessage.BAD_REQUEST}`,
  })
  async fetchCategoriesByDto(
    @Query() query: FetchCategoriesByDto,
  ): Promise<TCategory[]> {
    return await this.categoryService.fetchCategoriesBy(query);
  }

  @Get(':categoryId')
  @ApiResponse({
    status: 200,
    description: 'Category fetched successfully',
    type: TSwaggerCategory,
  })
  @ApiResponse({
    status: 500,
    description: 'Error while fetching category',
  })
  @ApiResponse({
    status: 400,
    description: `Error while fetching category: ${ErrorMessage.BAD_REQUEST}`,
  })
  async fetchCategoryById(
    @Param('categoryId') categoryId: string,
  ): Promise<TCategory> {
    return await this.categoryService.fetchCategoryById(categoryId);
  }
}
