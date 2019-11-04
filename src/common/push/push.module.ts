import { Module } from '@nestjs/common';
import { PushService } from './push.service';
import { NotificationModule } from './../../api/notification/notification.module';

@Module({
  imports: [
    NotificationModule
  ],
  providers: [
    PushService,    
  ],
  exports: [PushService],
})
export class PushModule { }