import { PrismaService } from '@/database/prisma.service';
import { ManageErrorService } from '@/utils/manage-error/manage-error.service';
import { Injectable, Logger } from '@nestjs/common';
import { ErrorMessage } from '@/types/errors/errorHttp';
import { HttpStatusCode } from '@/types/global/http/code';
import { Prisma } from '@prisma/client';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { FetchTransactionsByDto } from '../dtos/fetch-transactions-by.dto';
import { TTransaction } from '@/types/transaction';

@Injectable()
export class TransactionService {
  private readonly ownLogger = new Logger(TransactionService.name);

  constructor(
    private prisma: PrismaService,
    private readonly managerError: ManageErrorService,
  ) {}

  async createTransaction({
    amount,
    categoryId,
    userId,
  }: CreateTransactionDto): Promise<TTransaction> {
    try {
      const transaction = await this.prisma.transaction.create({
        data: {
          amount,
          categoryId,
          userId,
        },
      });

      const createdTransaction = await this.fetchTransactionById(
        transaction.id,
      );
      this.ownLogger.log('Transaction created successfully');

      return createdTransaction;
    } catch (error) {
      this.ownLogger.error('Error while creating transaction', error);
      this.managerError.ServerError(
        ErrorMessage.UNKNOW_ERROR,
        HttpStatusCode.BAD_REQUEST,
      );
    }
  }

  async fetchTransactionsBy({
    createdFrom,
    createdTo,
    minAmount,
    maxAmount,
    categoryId,
    userId,
    itemsPerPage,
    sortField,
    sortOrder,
    page,
  }: FetchTransactionsByDto): Promise<TTransaction[]> {
    const skip = page && itemsPerPage ? (page - 1) * itemsPerPage : undefined;
    const take = itemsPerPage ? parseInt(itemsPerPage.toString()) : undefined;
    const whereClause = {
      AND: [
        ...(createdFrom ? [{ createdAt: { gte: createdFrom } }] : []),
        ...(createdTo ? [{ createdAt: { lte: createdTo } }] : []),
        ...(minAmount ? [{ amount: { gte: minAmount } }] : []),
        ...(maxAmount ? [{ amount: { lte: maxAmount } }] : []),
        ...(categoryId ? [{ categoryId }] : []),
        ...(userId ? [{ userId }] : []),
      ].filter((clause) => Object.keys(clause).length > 0),
    };

    const orderBy: Prisma.TransactionOrderByWithRelationInput = {
      ...(sortField && { [sortField]: sortOrder }),
    };
    try {
      return await this.prisma.transaction.findMany({
        where: whereClause,
        orderBy,
        skip,
        take,
      });
    } catch (e) {
      this.ownLogger.error('Failed to fetch transactions', e);
      this.managerError.ServerError(
        ErrorMessage.UNKNOW_ERROR,
        HttpStatusCode.BAD_REQUEST,
      );
    }
  }

  async fetchTransactionById(transactionId: string): Promise<TTransaction> {
    try {
      const transaction = await this.prisma.transaction.findUniqueOrThrow({
        where: { id: transactionId },
      });

      this.ownLogger.log('Transaction fetched successfully');
      return transaction;
    } catch (error) {
      this.ownLogger.error('Error while fetching transaction', error);
      this.managerError.ServerError(
        ErrorMessage.BAD_REQUEST,
        HttpStatusCode.BAD_REQUEST,
      );
    }
  }
}
