import { Module } from '@nestjs/common';

import { ManageErrorService } from '@/utils/manage-error/manage-error.service';

@Module({
  providers: [ManageErrorService],
  exports: [ManageErrorService],
})
export class ErrorModule {}
