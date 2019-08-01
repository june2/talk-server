import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from './message.schema';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { RoomService } from './../room/room.service';
import { RoomSchema } from './../room/room.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'message', schema: MessageSchema }, { name: 'room', schema: RoomSchema }])],
  controllers: [MessageController],
  providers: [MessageService, RoomService],
})
export class MessageModule { }