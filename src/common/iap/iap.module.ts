import { Module } from '@nestjs/common';
import { IapService } from './iap.service';

@Module({
  imports: [],
  providers: [
    IapService,
  ],
  exports: [IapService],
})
export class IapModule { }