import { Module } from '@nestjs/common';

import { ErrorModule } from '@/types/errors/error.module';
import { PrismaService } from '@/database/prisma.service';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [ErrorModule],
  providers: [UserService, PrismaService],
  controllers: [UserController],
})
export class UserModule {}
