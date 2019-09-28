import { Module } from '@nestjs/common';
import { PushService } from './push.service';

@Module({
  providers: [
    {
      provide: PushService,      
      useValue: new PushService(),
    },
  ],
  exports: [PushService],
})
export class PushModule { }