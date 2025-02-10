import { PrismaService } from '@/database/prisma.service';
import { ManageErrorService } from '@/utils/manage-error/manage-error.service';
import { Injectable, Logger } from '@nestjs/common';
import { ErrorMessage } from '@/types/errors/errorHttp';
import { HttpStatusCode } from '@/types/global/http/code';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { FetchUsersByDto } from '../dtos/fetch-users-by.dto';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from '../dtos/create-user.dto';
import { TUser } from '@/types/user';

@Injectable()
export class UserService {
  private readonly ownLogger = new Logger(UserService.name);

  constructor(
    private prisma: PrismaService,
    private readonly managerError: ManageErrorService,
  ) {}

  async createUser({
    firstname,
    lastname,
    dateOfBirth,
    gender,
    email,
    password,
    defaultCurrency,
  }: CreateUserDto): Promise<TUser> {
    try {
      const user = await this.prisma.user.create({
        data: {
          firstname,
          lastname,
          dateOfBirth,
          gender,
          email,
          password,
          defaultCurrency,
        },
      });

      const createdUser = await this.fetchUserById(user.id);
      this.ownLogger.log('User created successfully');

      return createdUser;
    } catch (error) {
      this.ownLogger.error('Error while creating user', error);
      this.managerError.ServerError(
        ErrorMessage.UNKNOW_ERROR,
        HttpStatusCode.BAD_REQUEST,
      );
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<TUser> {
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
      this.ownLogger.log('User updated successfully');
      return user;
    } catch (e) {
      this.ownLogger.error('Failed to update user', e);
      this.managerError.ServerError(
        ErrorMessage.UNKNOW_ERROR,
        HttpStatusCode.BAD_REQUEST,
      );
    }
  }

  async fetchUsersBy({
    lastname,
    firstname,
    gender,
    email,
    itemsPerPage,
    sortField,
    sortOrder,
    page,
  }: FetchUsersByDto): Promise<TUser[]> {
    const skip = page && itemsPerPage ? (page - 1) * itemsPerPage : undefined;
    const take = itemsPerPage ? parseInt(itemsPerPage.toString()) : undefined;
    const whereClause = {
      AND: [
        ...(lastname
          ? [{ contains: lastname, mode: Prisma.QueryMode.insensitive }]
          : []),
        ...(firstname
          ? [{ contains: firstname, mode: Prisma.QueryMode.insensitive }]
          : []),
        ...(gender ? [{ gender }] : []),
        ...(email
          ? [{ contains: email, mode: Prisma.QueryMode.insensitive }]
          : []),
      ].filter((clause) => Object.keys(clause).length > 0),
    };

    const orderBy: Prisma.UserOrderByWithRelationInput = {
      ...(sortField && { [sortField]: sortOrder }),
    };
    try {
      return await this.prisma.user.findMany({
        where: whereClause,
        orderBy,
        skip,
        take,
      });
    } catch (e) {
      this.ownLogger.error('Failed to fetch users', e);
      this.managerError.ServerError(
        ErrorMessage.UNKNOW_ERROR,
        HttpStatusCode.BAD_REQUEST,
      );
    }
  }

  async fetchUserById(userId: string): Promise<TUser> {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { id: userId },
      });

      this.ownLogger.log('User fetched successfully');
      return user;
    } catch (error) {
      this.ownLogger.error('Error while fetching user', error);
      this.managerError.ServerError(
        ErrorMessage.BAD_REQUEST,
        HttpStatusCode.BAD_REQUEST,
      );
    }
  }
}
