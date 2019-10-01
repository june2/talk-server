import { Module } from '@nestjs/common';
import { PushService } from './push.service';
import { NotificationModule } from './../../api/notification/notification.module';
import { NotificationService } from './../../api/notification/notification.service';

@Module({
  imports: [
    NotificationModule
  ],
  providers: [
    PushService,
    NotificationService
  ],
  exports: [PushService],
})
export class PushModule { }