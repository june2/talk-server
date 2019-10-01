import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationSchema } from './notification.schema';
import { NotificationService } from './notification.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'notification', schema: NotificationSchema }])],  
  providers: [NotificationService],
})
export class NotificationModule { }