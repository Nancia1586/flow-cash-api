import { ECategorySortField } from '@/types/category';
import { ESortOrder } from '@/types/global/sort';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

import {
  IsDate,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsUUID,
  Min,
} from 'class-validator';

export class FetchTransactionsByDto {
  @ApiPropertyOptional({
    description: 'Minimum creation date to filter by',
    example: '2023-05-01T00:00:00Z',
  })
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  createdFrom?: Date;

  @ApiPropertyOptional({
    description: 'Maximum creation date to filter by',
    example: '2023-05-31T23:59:59Z',
  })
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  createdTo?: Date;

  @ApiPropertyOptional({
    description: 'Minimum amount to filter by',
    example: 50,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseFloat(value))
  minAmount?: number;

  @ApiPropertyOptional({
    description: 'Maximum amount to filter by',
    example: 200,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseFloat(value))
  maxAmount?: number;

  @ApiPropertyOptional({
    description: 'User ID to filter by',
    example: '33ebb488-7431-498e-9c7b-51f2f2c992f3',
  })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiPropertyOptional({
    description: 'Category ID to filter by',
    example: '33ebb488-7431-498e-9c7b-51f2f2c992f3',
  })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

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
