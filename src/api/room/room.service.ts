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
    return await created.save();
  }

  async findAll(page: number = 1, limit: number = 10,
    sort: any = { updatedAt: -1 }, query: any = {}): Promise<Room[]> {
    let options = {
      sort: JSON.parse(sort),
      populate: [{
        path: 'users',
        select: 'id name images gender birthday location',
        // match: { color: 'black' },
        // options: { sort: { name: -1 } }
      }],
      lean: true,
      page: page,
      limit: limit
    };
    return await this.rooms.paginate(query, options);
  }

  async findById(id: string): Promise<Room> {
    return await this.room.findById(id).populate(['users', 'lefts']).exec();
  }

  async findByUsers(id: string, userId: string): Promise<Room> {
    return await this.room.findOne({ users: { $all: [id, userId] } }).exec();
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
          // "user": {
          //   "userId": { "$arrayElemAt": ["$user._id", 0.0] },
          //   "userName": { "$arrayElemAt": ["$user.name", 0.0] },
          //   "userImages": { "$arrayElemAt": ["$user.images", 0.0] },
          // },
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

  async findMessageByRoomId(id: string, page: number = 1, limit: number = 50): Promise<Message[]> {
    let query = { room: id };
    let options = {
      // select: 'title date author',
      sort: { updatedAt: -1 },
      populate: [{
        path: 'user',
        select: 'id name images',
        // match: { color: 'black' },
        // options: { sort: { name: -1 } }
      }],
      lean: true,
      page: page,
      limit: limit
    };
    return await this.message.paginate(query, options);
  }

  async updatLastMsgByRoomId(id: string, lastMsg: string): Promise<Room> {
    return await this.room.findByIdAndUpdate(id, { lastMsg: lastMsg, lefts: [] }, { new: true }).exec();
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
