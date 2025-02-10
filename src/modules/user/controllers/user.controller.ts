import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ErrorMessage } from '@/types/errors/errorHttp';
import { UserService } from '../services/user.service';
import { FetchUsersByDto } from '../dtos/fetch-users-by.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { TSwaggerUser } from '@/types/swaggers/user';
import { CreateUserDto } from '../dtos/create-user.dto';
import { TUser } from '@/types/user';
@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'Create user',
  })
  @ApiResponse({
    status: 200,
    description: 'User created successfully',
    type: TSwaggerUser,
  })
  @ApiResponse({
    status: 500,
    description: 'Error while creating user',
  })
  @ApiResponse({
    status: 400,
    description: `Error while creating user: ${ErrorMessage.BAD_REQUEST}`,
  })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<TUser> {
    return this.userService.createUser(createUserDto);
  }

  @Put('/:userId')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: TSwaggerUser,
  })
  @ApiResponse({
    status: 500,
    description: `Error while updating user:${ErrorMessage.UNKNOW_ERROR}`,
  })
  async updateUser(
    @Param('userId') userId: string,
    @Body(new ValidationPipe()) body: UpdateUserDto,
  ): Promise<TUser> {
    return this.userService.updateUser(userId, body);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Users fetched successfully',
    type: [TSwaggerUser],
  })
  @ApiResponse({
    status: 500,
    description: 'Error while fetching users',
  })
  @ApiResponse({
    status: 400,
    description: `Error while fetching users: ${ErrorMessage.BAD_REQUEST}`,
  })
  async fetchUsersByDto(@Query() query: FetchUsersByDto): Promise<TUser[]> {
    return await this.userService.fetchUsersBy(query);
  }

  @Get(':userId')
  @ApiResponse({
    status: 200,
    description: 'User fetched successfully',
    type: TSwaggerUser,
  })
  @ApiResponse({
    status: 500,
    description: 'Error while fetching user',
  })
  @ApiResponse({
    status: 400,
    description: `Error while fetching user: ${ErrorMessage.BAD_REQUEST}`,
  })
  async fetchUserById(@Param('userId') userId: string): Promise<TUser> {
    return await this.userService.fetchUserById(userId);
  }
}
