import { Currency, Gender } from '@/types/user';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { IsDate, IsEnum } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Lastname of the user',
    example: 'Doe',
    required: true,
  })
  lastname: string;

  @ApiProperty({
    description: 'Firstname of the user',
    example: 'John',
    required: true,
  })
  firstname: string;

  @ApiProperty({
    description: 'Date of birth of the user',
    example: new Date(),
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  dateOfBirth: Date;

  @IsEnum(Gender)
  @ApiProperty({
    enum: Gender,
    example: Gender.FEMALE,
    description: 'The gender of the user',
    required: true,
  })
  gender: Gender;

  @ApiProperty({
    description: 'Email of the user',
    example: 'vZCJ2@example.com',
    required: true,
  })
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'password',
    required: true,
  })
  password: string;

  @IsEnum(Currency)
  @ApiProperty({
    enum: Currency,
    example: Currency.MGA,
    description: 'The default currency used by the user',
    required: true,
  })
  defaultCurrency: Currency;
}
