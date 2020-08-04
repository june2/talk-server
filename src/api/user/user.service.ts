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

  get userRepo(): Model<User> {
    return this.user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const created = new this.user(createUserDto);
    return await created.save();
  }

  async createAll(arr: CreateUserSampleDto[]): Promise<User[]> {
    return await this.user.insertMany(arr);
  }

  async findAll(id: string, page: number = 1, limit: number = 10,
    sort: any = { lastLoginAt: -1 }, q: any = {}): Promise<User[]> {
    let query = { _id: { $ne: id } };
    if (q) query = Object.assign(query, (typeof q) === 'string' ? JSON.parse(q) : q);
    let options = {
      sort: (typeof sort) === 'string' ? JSON.parse(sort) : sort,
      lean: true,
      page: page,
      limit: limit
    };
    return await this.users.paginate(query, options);
  }

  async findActive(id: string, blocks: any[], page: number = 0, limit: number = 10,
    q: string, sort: any = { lastLoginAt: -1 }): Promise<User[]> {
    let query = {
      $and: [
        { _id: { $nin: [id, ...blocks] } },
        { isActive: true },
        { state: { $ne: 'ADMIN' } },
        { state: { $ne: 'BLOCK' } },
        { state: { $ne: 'LEAVE' } },
      ]
    };
    if (q) query = Object.assign(query, JSON.parse(q));
    let options = {
      sort: sort,
      lean: true,
      page: page,
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
    this.user.findByIdAndUpdate(id, { state: state, isActive: false }, { new: true }).exec();
  }

  async updatePoint(id: string, point: number): Promise<void> {
    this.user.findByIdAndUpdate(id, { point: point }, { new: true }).exec();
  }

  async addBlockUser(id: string, blocks: any[]): Promise<void> {
    this.user.findByIdAndUpdate(id, { blocks: blocks }, { new: true }).exec();
  }

  async registerPushToken(id: string, newValue: UpdateUserPushTokenDto): Promise<void> {
    this.user.findByIdAndUpdate(id, newValue, { new: true }).exec();
  }

  async deleteSample(state: string): Promise<void> {
    await this.user.deleteMany({ state: state });
  }

  async updateUserLastLogin() {
    const users: User[] = await this.user.aggregate([{
      // $match: {
      //   $and: [
      //     { isActive: true },
      //     { state: { $ne: 'ADMIN' } },
      //     { state: { $ne: 'BLOCK' } },
      //     { state: { $ne: 'LEAVE' } },
      //   ]
      // },
      $sample: { size: 10 }
    }]);
    users.forEach(async user => {
      await this.user.findByIdAndUpdate(user._id, { lastLoginAt: new Date() });
    })
  }
}
