import { Gender } from '@/types/user';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { IsDate, IsEnum, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'Lastname of the user',
    example: 'Doe',
  })
  @IsOptional()
  lastname?: string;

  @ApiPropertyOptional({
    description: 'Firstname of the user',
    example: 'John',
  })
  @IsOptional()
  firstname?: string;

  @ApiPropertyOptional({
    description: 'Date of birth of the user',
    example: new Date(),
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  dateOfBirth?: Date;

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
    description: 'Email of the user',
    example: 'vZCJ2@example.com',
  })
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    description: 'Password of the user',
    example: 'password',
  })
  @IsOptional()
  password?: string;
}
