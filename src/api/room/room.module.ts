import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomSchema } from './room.schema';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { MessageSchema } from './../message/message.schema';
import { MessageService } from './../message/message.service';
import { PushModule } from '../../common/push/push.module';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'room', schema: RoomSchema },
    { name: 'message', schema: MessageSchema }]),
    PushModule
  ],
  controllers: [RoomController],
  providers: [RoomService, MessageService],
})
export class RoomModule { }