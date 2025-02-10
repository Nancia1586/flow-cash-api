import { ESortOrder } from '@/types/global/sort';
import { EUserSortField, Gender } from '@/types/user';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';

export class FetchUsersByDto {
  @ApiPropertyOptional({
    description: 'Lastname of the user to filter by',
    example: 'Doe',
  })
  @IsOptional()
  lastname?: string;

  @ApiPropertyOptional({
    description: 'Firstname of the user to filter by',
    example: 'John',
  })
  @IsOptional()
  firstname?: string;

  @IsOptional()
  @IsEnum(Gender)
  @ApiPropertyOptional({
    enum: Gender,
    example: Gender.FEMALE,
    description: 'The gender of the user',
    required: false,
  })
  gender?: Gender;

  @ApiPropertyOptional({
    description: 'Email of the user to filter by',
    example: 'vZCJ2@example.com',
  })
  @IsOptional()
  email?: string;

  @IsOptional()
  @IsEnum(EUserSortField)
  @ApiPropertyOptional({
    enum: EUserSortField,
    example: EUserSortField.EMAIL,
    description: 'The sort field of the user',
    required: false,
  })
  sortField?: EUserSortField;

  @IsOptional()
  @IsEnum(ESortOrder)
  @ApiPropertyOptional({
    enum: ESortOrder,
    example: ESortOrder.ASC,
    description: 'The sort order of the user',
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
