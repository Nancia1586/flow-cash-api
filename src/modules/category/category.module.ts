import { Module } from '@nestjs/common';

import { ErrorModule } from '@/types/errors/error.module';
import { CategoryService } from './services/category.service';
import { PrismaService } from '@/database/prisma.service';
import { CategoryController } from './controllers/category.controller';

@Module({
  imports: [ErrorModule],
  providers: [CategoryService, PrismaService],
  controllers: [CategoryController],
})
export class CategoryModule {}
