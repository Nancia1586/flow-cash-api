import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ErrorMessage } from '@/types/errors/errorHttp';
import { TransactionService } from '../services/transaction.service';
import { FetchTransactionsByDto } from '../dtos/fetch-transactions-by.dto';
import { TSwaggerTransaction } from '@/types/swaggers/transaction';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { TTransaction } from '@/types/transaction';
@Controller('categories')
@ApiTags('categories')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiOperation({
    summary: 'Create transaction',
  })
  @ApiResponse({
    status: 200,
    description: 'Transaction created successfully',
    type: TSwaggerTransaction,
  })
  @ApiResponse({
    status: 500,
    description: 'Error while creating transaction',
  })
  @ApiResponse({
    status: 400,
    description: `Error while creating transaction: ${ErrorMessage.BAD_REQUEST}`,
  })
  async createTransaction(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<TTransaction> {
    return this.transactionService.createTransaction(createTransactionDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Transactions fetched successfully',
    type: [TSwaggerTransaction],
  })
  @ApiResponse({
    status: 500,
    description: 'Error while fetching transactions',
  })
  @ApiResponse({
    status: 400,
    description: `Error while fetching transactions: ${ErrorMessage.BAD_REQUEST}`,
  })
  async fetchTransactionsByDto(
    @Query() query: FetchTransactionsByDto,
  ): Promise<TTransaction[]> {
    return await this.transactionService.fetchTransactionsBy(query);
  }

  @Get(':transactionId')
  @ApiResponse({
    status: 200,
    description: 'Transaction fetched successfully',
    type: TSwaggerTransaction,
  })
  @ApiResponse({
    status: 500,
    description: 'Error while fetching transaction',
  })
  @ApiResponse({
    status: 400,
    description: `Error while fetching transaction: ${ErrorMessage.BAD_REQUEST}`,
  })
  async fetchTransactionById(
    @Param('transactionId') transactionId: string,
  ): Promise<TTransaction> {
    return await this.transactionService.fetchTransactionById(transactionId);
  }
}
