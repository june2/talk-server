import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose-paginate-v2';
import { Model, Types } from 'mongoose';
import { CreateRoomDto } from './room.dto';
import { Room } from './room.interface';
import { Message } from './../message/message.interface';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel('room') private readonly room: Model<Room>,
    @InjectModel('room') private readonly rooms: PaginateModel<Room>,
    @InjectModel('message') private readonly message: PaginateModel<Message>,
  ) { }

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const created = new this.room(createRoomDto);
    // this.pushService.send();
    return await created.save();
  }

  async findAll(): Promise<Room[]> {
    return await this.rooms.find().populate('users').exec();
  }

  async findById(id: string): Promise<Room> {
    return await this.room.findById(id).exec();
  }

  async findByUserId(id: string, page: number = 1, limit: number = 10): Promise<Room[]> {
    let options = {
      sort: { updatedAt: -1 },
      page: page,
      limit: limit
    };
    let query = [
      {
        "$match": {
          "users": { "$in": [Types.ObjectId(id)] },
          "lefts": { "$nin": [Types.ObjectId(id)] }
        }
      },
      { "$unwind": "$users" },
      {
        "$match": {
          "users": { "$ne": Types.ObjectId(id) }
        }
      },
      {
        "$lookup": {
          "from": "notifications",
          "localField": "_id",
          "foreignField": "room",
          "as": "notification"
        }
      },
      {
        "$lookup": {
          "from": "users",
          "localField": "users",
          "foreignField": "_id",
          "as": "user"
        }
      },
      {
        "$project": {
          "user": { "$arrayElemAt": ["$user", 0.0] },
          "lastMsg": "$lastMsg",
          "updatedAt": "$updatedAt",
          "createdAt": "$createdAt",
          "count": {
            "$size": {
              $filter: {
                input: "$notification",
                as: "notification",
                cond: { $eq: ["$$notification.user", Types.ObjectId(id)] }
              }
            }
          }
        }
      }
    ];
    return await this.rooms.aggregatePaginate(this.room.aggregate(query), options);
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

  async updatLeftByRoomId(id: string, arr: Array<string>): Promise<Room> {
    return await this.room.findByIdAndUpdate(id, { lefts: arr }, { new: true });
  }

  async checkUserInRoom(id: string, userId: string): Promise<Room> {
    let room = await this.rooms.findById(id).exec();
    if (room) {
      for (let i = 0; i < room.users.length; i++) {
        if (room.users[i] == userId) {
          return room;
        }
      }
    }
    return null;
  }
}
