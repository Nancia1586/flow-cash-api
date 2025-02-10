import { ApiProperty } from '@nestjs/swagger';

import { IsEnum } from 'class-validator';
import { Currency, Gender } from '../user';

export class TSwaggerUser {
  @ApiProperty({
    description: 'Lastname of the user',
    example: 'Doe',
  })
  lastname: string;

  @ApiProperty({
    description: 'Firstname of the user',
    example: 'John',
  })
  fistname: string;

  @ApiProperty({
    description: 'Date of birth of the user',
    example: new Date(),
  })
  dateOfBirth: Date;

  @ApiProperty({
    description: 'Gender of the user',
    example: Gender.MALE,
  })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    description: 'Email of the user',
    example: 'vZCJ2@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'password',
  })
  password: string;

  @ApiProperty({
    description: 'Default currency used by the user',
    example: Currency.MGA,
  })
  @IsEnum(Currency)
  defaultCurrency: Currency;
}
