import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoomDto } from './room.dto';
import { Room } from './room.interface';
import { Message } from './../message/message.interface';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel('room') private readonly room: Model<Room>,
    @InjectModel('message') private readonly message: Model<Message>
  ) { }

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const created = new this.room(createRoomDto);
    return await created.save();
  }

  async findAll(): Promise<Room[]> {
    return await this.room.find().populate('users').exec();
  }

  async findById(id: string): Promise<Room> {
    return await this.room.findById(id).exec();
  }

  async findByUserId(id: string): Promise<Room[]> {
    return await this.room.find({
      users: { $in: [id] }
    }).populate({
      path: 'users',
      match: { _id: { $ne: id } }
    }).exec();
  }

  async findMessageByRoomId(id: string): Promise<Message[]> {
    return await this.message.find({ room: id }).populate('user').exec();
  }

  async checkUserInRoom(id: string, userId: string): Promise<Boolean> {
    let res = false;
    let room = await this.room.findById(id).exec();
    for (let i = 0; i < room.users.length; i++) {
      if (room.users[i] == userId) {
        res = true;
        break;
      }
    }
    return res;
  }
}
