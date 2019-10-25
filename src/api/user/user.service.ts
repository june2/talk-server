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

  async findAll(id: string, offset: number = 0, limit: number = 10,
    sort: any = { lastLoginAt: -1 }, q: any = {}): Promise<User[]> {
    let query = { _id: { $ne: id } };
    if (q) query = Object.assign(query, q);
    let options = {
      sort: sort,
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
    return await this.user.findByIdAndUpdate(id, { ...newValue, lastLoginAt: new Date() }, { new: false }).exec();
  }

  async upload(id: string, images: object): Promise<User> {
    return this.user.findByIdAndUpdate(id, { images: images, lastLoginAt: new Date() }, { new: true }).exec();
  }

  async updateLastLogin(id: string): Promise<void> {
    this.user.findByIdAndUpdate(id, { lastLoginAt: new Date() }, { new: true }).exec();
  }

  async updateState(id: string, state: string): Promise<void> {
    this.user.findByIdAndUpdate(id, { state: state }, { new: true }).exec();
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
