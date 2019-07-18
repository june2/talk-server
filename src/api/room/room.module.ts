import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from './../message/message.schema';
import { RoomSchema } from './room.schema';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'room', schema: RoomSchema }, { name: 'message', schema: MessageSchema }])],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule { }