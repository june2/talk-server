import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose-paginate-v2';
import { Model } from 'mongoose';
import { CreateRoomDto } from './room.dto';
import { Room } from './room.interface';
import { Message } from './../message/message.interface';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel('room') private readonly room: Model<Room>,
    @InjectModel('room') private readonly rooms: PaginateModel<Room>,
    @InjectModel('message') private readonly message: PaginateModel<Message>
  ) { }

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const created = new this.room(createRoomDto);
    return await created.save();
  }

  async findAll(): Promise<Room[]> {
    return await this.rooms.find().populate('users').exec();
  }

  async findById(id: string): Promise<Room> {
    return await this.room.findById(id).exec();
  }

  async findByUserId(id: string, offset: number = 0, limit: number = 10): Promise<Room[]> {
    let query = { users: { $in: id } };
    let options = {
      sort: { createdAt: -1 },
      populate: {
        path: 'users',
        match: { _id: { $ne: id } }
      },
      lean: true,
      offset: offset,
      limit: limit
    };
    return await this.rooms.paginate(query, options);
  }

  async findMessageByRoomId(id: string, offset: number = 0, limit: number = 10): Promise<Message[]> {
    let query = { room: id };
    let options = {
      // select: 'title date author',
      sort: { updatedAt: -1 },
      populate: 'user',
      lean: true,
      offset: offset,
      limit: limit
    };
    return await this.message.paginate(query, options);
  }

  async updatLastMsgByRoomId(id: string, lastMsg: string): Promise<Room> {
    return await this.room.findByIdAndUpdate(id, { lastMsg: lastMsg }, { new: true }).exec();
  }

  async checkUserInRoom(id: string, userId: string): Promise<Boolean> {
    let res = false;
    let room = await this.rooms.findById(id).exec();
    if (room) {
      for (let i = 0; i < room.users.length; i++) {
        if (room.users[i] == userId) {
          res = true;
          break;
        }
      }
    }
    return res;
  }
}
