import { ApiProperty } from '@nestjs/swagger';

import { IsNumber, IsUUID } from 'class-validator';

export class TSwaggerTransaction {
  @ApiProperty({
    description: 'Label of the category',
    example: 'Transport',
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'Category ID',
    example: '33ebb488-7431-498e-9c7b-51f2f2c992f3',
  })
  @IsUUID()
  categoryId: string;

  @ApiProperty({
    description: 'User ID',
    example: '33ebb488-7431-498e-9c7b-51f2f2c992f3',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    example: '2023-05-01T10:00:00Z',
    description: 'Creation date of transaction',
    type: Date,
  })
  createdAt: Date;
}
