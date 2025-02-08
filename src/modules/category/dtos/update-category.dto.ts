import { CategoryType } from '@/types/category';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsEnum, IsOptional } from 'class-validator';

export class UpdateCategoryDto {
  @ApiPropertyOptional({
    description: 'Label of the category',
    example: 'Transport',
  })
  @IsOptional()
  label?: string;

  @ApiPropertyOptional({
    description: 'Type of the category (Expense, Income, ...)',
    example: CategoryType.EXPENSE,
  })
  @IsOptional()
  @IsEnum(CategoryType)
  type?: CategoryType;

  @ApiPropertyOptional({
    description: 'Icon path of the category',
    example: 'directory/path/icon.jpg',
  })
  @IsOptional()
  icon?: string;

  @ApiPropertyOptional({
    description: 'Color associate to the category',
    example: '#ffffff',
  })
  @IsOptional()
  color?: string;
}
