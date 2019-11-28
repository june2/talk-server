import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from './message.schema';
import { MessageController } from './message.controller';
import { MessageAdminController } from './message.admin.controller';
import { MessageService } from './message.service';
import { RoomService } from './../room/room.service';
import { RoomSchema } from './../room/room.schema';
import { NotificationService } from './../notification/notification.service';
import { UserModule } from './../user/user.module';
import { PushModule } from '../../common/push/push.module';
import { SfModule } from '../../common/stepfunction/sf.module';

@Module({
  imports: [
    UserModule,
    PushModule,
    SfModule,
    MongooseModule.forFeature([
      { name: 'message', schema: MessageSchema },
      { name: 'room', schema: RoomSchema }]),
  ],
  controllers: [MessageAdminController, MessageController],
  providers: [MessageService, RoomService, NotificationService],
})
export class MessageModule { }