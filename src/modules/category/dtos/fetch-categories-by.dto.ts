import { CategoryType, ECategorySortField } from '@/types/category';
import { ESortOrder } from '@/types/global/sort';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

import { IsEnum, IsInt, IsOptional, IsUUID, Min } from 'class-validator';

export class FetchCategoriesByDto {
  @ApiPropertyOptional({
    description: 'Label of the category to filter by',
    example: 'Transport',
  })
  @IsOptional()
  label?: string;

  @ApiPropertyOptional({
    description: 'Type of the category (Expense, Income, ...) to filter by',
    example: CategoryType.EXPENSE,
  })
  @IsOptional()
  @IsEnum(CategoryType)
  type?: CategoryType;

  @ApiPropertyOptional({
    description: 'User ID to filter by',
    example: '33ebb488-7431-498e-9c7b-51f2f2c992f3',
  })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsOptional()
  @IsEnum(ECategorySortField)
  @ApiPropertyOptional({
    enum: ECategorySortField,
    example: ECategorySortField.LABEL,
    description: 'The sort field of the category',
    required: false,
  })
  sortField?: ECategorySortField;

  @IsOptional()
  @IsEnum(ESortOrder)
  @ApiPropertyOptional({
    enum: ESortOrder,
    example: ESortOrder.ASC,
    description: 'The sort order of the category',
    required: false,
  })
  sortOrder?: ESortOrder;

  @ApiPropertyOptional({ description: 'Number of items per page', example: 10 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10))
  itemsPerPage?: number;

  @ApiPropertyOptional({ description: 'Page number', example: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10))
  page?: number;
}
