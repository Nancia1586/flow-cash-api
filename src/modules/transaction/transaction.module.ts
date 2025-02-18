import { Module } from '@nestjs/common';

import { ErrorModule } from '@/types/errors/error.module';
import { TransactionService } from './services/transaction.service';
import { PrismaService } from '@/database/prisma.service';
import { TransactionController } from './controllers/transaction.controller';

@Module({
  imports: [ErrorModule],
  providers: [TransactionService, PrismaService],
  controllers: [TransactionController],
})
export class TransactionModule {}
