import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateRoomDto } from './room.dto';
import { Room } from './room.interface';

@Injectable()
export class RoomService {
  constructor(@Inject('room') private readonly room: Model<Room>) { }

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const created = new this.room(createRoomDto);
    return await created.save();
  }

  async findAll(): Promise<Room[]> {
    return await this.room.find().populate('users').exec();
  }

  async findById(id: string): Promise<Room> {
    return await this.room.findById(id).populate('users').exec();
  }
}
