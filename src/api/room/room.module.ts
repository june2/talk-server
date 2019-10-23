import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomSchema } from './room.schema';
import { RoomController } from './room.controller';
import { RoomAdminController } from './room.admin.controller';
import { RoomService } from './room.service';
import { MessageSchema } from './../message/message.schema';
import { MessageService } from './../message/message.service';
import { UserModule } from './../user/user.module';
import { UserService } from './../user/user.service';
import { NotificationService } from '../notification/notification.service';
import { PushModule } from '../../common/push/push.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: 'room', schema: RoomSchema },
      { name: 'message', schema: MessageSchema }]),
    PushModule,
  ],
  controllers: [RoomAdminController, RoomController],
  providers: [RoomService, MessageService, NotificationService, UserService],
})
export class RoomModule { }