import { ApiProperty } from '@nestjs/swagger';

import { IsNumber, IsUUID, Min } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  @Min(0)
  @ApiProperty({
    description: 'Amount of the transaction',
    example: 32000,
    required: true,
  })
  amount: number;

  @ApiProperty({
    description: 'Category ID',
    example: '33ebb488-7431-498e-9c7b-51f2f2c992f3',
    required: true,
  })
  @IsUUID()
  categoryId: string;

  @ApiProperty({
    description: 'User ID',
    example: '33ebb488-7431-498e-9c7b-51f2f2c992f3',
    required: true,
  })
  @IsUUID()
  userId: string;
}
