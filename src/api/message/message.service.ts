import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMessageDto } from './message.dto';
import { Message } from './message.interface';

@Injectable()
export class MessageService {
  constructor(@InjectModel('message') private readonly message: Model<Message>) { }

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const created = new this.message(createMessageDto);
    return await created.save();
  }

  async findAll(): Promise<Message[]> {
    return await this.message.find().populate('user').exec();
  }

  async findByUserId(id: string): Promise<Message[]> {    
    return await this.message.find({
      users: { $in: [id] }
    }).populate({
      path: 'users',
      match: { _id: { $ne: id } }
    }).exec();
  }

  async findById(id: string): Promise<Message> {
    return await this.message.findById(id).populate('user').exec();
  }
}
