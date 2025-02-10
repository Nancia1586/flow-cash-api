import { PrismaService } from '@/database/prisma.service';
import { ManageErrorService } from '@/utils/manage-error/manage-error.service';
import { Injectable, Logger } from '@nestjs/common';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { TCategory } from '@/types/category';
import { ErrorMessage } from '@/types/errors/errorHttp';
import { HttpStatusCode } from '@/types/global/http/code';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { FetchCategoriesByDto } from '../dtos/fetch-categories-by.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoryService {
  private readonly ownLogger = new Logger(CategoryService.name);

  constructor(
    private prisma: PrismaService,
    private readonly managerError: ManageErrorService,
  ) {}

  async createCategory({
    label,
    type,
    icon,
    color,
    userId,
  }: CreateCategoryDto): Promise<TCategory> {
    try {
      const category = await this.prisma.category.create({
        data: {
          label,
          type,
          icon,
          color,
          userId,
        },
      });

      const createdCategory = await this.fetchCategoryById(category.id);
      this.ownLogger.log('Category created successfully');

      return createdCategory;
    } catch (error) {
      this.ownLogger.error('Error while creating category', error);
      this.managerError.ServerError(
        ErrorMessage.UNKNOW_ERROR,
        HttpStatusCode.BAD_REQUEST,
      );
    }
  }

  async updateCategory(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<TCategory> {
    try {
      const category = await this.prisma.category.update({
        where: { id },
        data: updateCategoryDto,
      });
      this.ownLogger.log('Category updated successfully');
      return category;
    } catch (e) {
      this.ownLogger.error('Failed to update Category', e);
      this.managerError.ServerError(
        ErrorMessage.UNKNOW_ERROR,
        HttpStatusCode.BAD_REQUEST,
      );
    }
  }

  async fetchCategoriesBy({
    label,
    type,
    userId,
    itemsPerPage,
    sortField,
    sortOrder,
    page,
  }: FetchCategoriesByDto): Promise<TCategory[]> {
    const skip = page && itemsPerPage ? (page - 1) * itemsPerPage : undefined;
    const take = itemsPerPage ? parseInt(itemsPerPage.toString()) : undefined;
    const whereClause = {
      AND: [
        ...(label
          ? [{ contains: label, mode: Prisma.QueryMode.insensitive }]
          : []),
        ...(type ? [{ type }] : []),
        ...(userId ? [{ userId }] : []),
      ].filter((clause) => Object.keys(clause).length > 0),
    };

    const orderBy: Prisma.CategoryOrderByWithRelationInput = {
      ...(sortField && { [sortField]: sortOrder }),
    };
    try {
      return await this.prisma.category.findMany({
        where: whereClause,
        orderBy,
        skip,
        take,
      });
    } catch (e) {
      this.ownLogger.error('Failed to fetch categories', e);
      this.managerError.ServerError(
        ErrorMessage.UNKNOW_ERROR,
        HttpStatusCode.BAD_REQUEST,
      );
    }
  }

  async fetchCategoryById(categoryId: string): Promise<TCategory> {
    try {
      const category = await this.prisma.category.findUniqueOrThrow({
        where: { id: categoryId },
      });

      this.ownLogger.log('Category fetched successfully');
      return category;
    } catch (error) {
      this.ownLogger.error('Error while fetching category', error);
      this.managerError.ServerError(
        ErrorMessage.BAD_REQUEST,
        HttpStatusCode.BAD_REQUEST,
      );
    }
  }
}
