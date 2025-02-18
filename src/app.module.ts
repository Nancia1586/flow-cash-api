import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';

import { NestjsFormDataModule } from 'nestjs-form-data';

import configuration from '@/config/configuration';
import { UtilsModule } from '@/utils/utils.module';
import { CategoryModule } from './modules/category/category.module';
import { UserModule } from './modules/user/user.module';
import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    NestjsFormDataModule.config({ isGlobal: true }),
    UtilsModule,
    CategoryModule,
    UserModule,
    TransactionModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
