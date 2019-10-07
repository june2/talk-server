import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose-paginate-v2';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto, UpdateUserPushTokenDto, CreateUserSampleDto } from './user.dto'
import { User } from './user.interface';


@Injectable()
export class UserService {
  constructor(
    @InjectModel('user') private readonly user: Model<User>,
    @InjectModel('user') private readonly users: PaginateModel<User>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const created = new this.user(createUserDto);
    return await created.save();
  }

  async createAll(arr: CreateUserSampleDto[]): Promise<User[]> {
    return await this.user.insertMany(arr);
  }

  async findAll(id: string, offset: number = 0, limit: number = 10): Promise<User[]> {
    let query = { _id: { $ne: id } };
    let options = {
      sort: { lastLoginAt: -1 },
      lean: true,
      offset: offset,
      limit: limit
    };
    return await this.users.paginate(query, options);
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

  async upload(id: string, images: object): Promise<User> {
    return this.user.findByIdAndUpdate(id, { images: images }, { new: true }).exec();
  }

  async updateLastLogin(id: string): Promise<void> {
    this.user.findByIdAndUpdate(id, { lastLoginAt: new Date() }, { new: true }).exec();
  }

  async updatePoint(id: string, point: number): Promise<void> {
    this.user.findByIdAndUpdate(id, { point: point }, { new: true }).exec();
  }

  async registerPushToken(id: string, newValue: UpdateUserPushTokenDto): Promise<void> {
    this.user.findByIdAndUpdate(id, newValue, { new: true }).exec();
  }

  async deleteSample(state: string): Promise<void> {
    await this.user.deleteMany({ state: state });
  }
}
