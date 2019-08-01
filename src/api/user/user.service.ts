import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './user.dto'
import { User } from './user.interface';


@Injectable()
export class UserService {
  constructor(@InjectModel('user') private readonly user: Model<User>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const created = new this.user(createUserDto);
    return await created.save();
  }

  async findAll(): Promise<User[]> {
    return await this.user.find().exec();
  }

  async findOne(options: object): Promise<User> {
    return this.user.findOne(options).exec();
  }

  async findById(id: string): Promise<User> {
    return await this.user.findById(id).exec();
  }

  async update(id: string, newValue: UpdateUserDto): Promise<User> {
    return await this.user.findByIdAndUpdate(id, newValue, { new: true }).exec();    
  }

  async upload(id: string, filename: string, path: string): Promise<User> {
    let user = await this.user.findById(id).exec();
    user.images.push({ thumbnail: filename, full: path });
    return await user.save();
  }

  // async delete(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
  //   return await this.userRepository.d
  // }
}
