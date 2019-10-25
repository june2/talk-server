import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from './message.schema';
import { MessageController } from './message.controller';
import { MessageAdminController } from './message.admin.controller';
import { MessageService } from './message.service';
import { RoomService } from './../room/room.service';
import { RoomSchema } from './../room/room.schema';
import { UserModule } from './../user/user.module';
import { UserService } from './../user/user.service';
import { PushModule } from '../../common/push/push.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: 'message', schema: MessageSchema },
      { name: 'room', schema: RoomSchema }]),
    PushModule
  ],
  controllers: [MessageAdminController, MessageController],
  providers: [MessageService, RoomService, UserService],
})
export class MessageModule { }