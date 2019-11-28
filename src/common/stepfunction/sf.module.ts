import { Module } from '@nestjs/common';
import { SfService } from './sf.service';

@Module({
  imports: [],
  providers: [
    SfService,
  ],
  exports: [SfService],
})
export class SfModule { }