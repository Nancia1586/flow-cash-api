import { CategoryType } from '@/types/category';
import { ApiProperty } from '@nestjs/swagger';

import { IsEnum, IsUUID } from 'class-validator';

export class TSwaggerCategory {
  @ApiProperty({
    description: 'Label of the category',
    example: 'Transport',
  })
  label: string;

  @ApiProperty({
    description: 'Type of the category (Expense, Income, ...)',
    example: CategoryType.EXPENSE,
  })
  @IsEnum(CategoryType)
  type: CategoryType;

  @ApiProperty({
    description: 'Icon path of the category',
    example: 'directory/path/icon.jpg',
  })
  icon: string;

  @ApiProperty({
    description: 'Color associate to the category',
    example: '#ffffff',
  })
  color: string;

  @ApiProperty({
    description: 'User ID',
    example: '33ebb488-7431-498e-9c7b-51f2f2c992f3',
  })
  @IsUUID()
  userId: string;
}
