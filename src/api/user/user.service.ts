import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './user.dto'
import { User } from './user.interface';


@Injectable()
export class UserService {
  constructor(@Inject('user') private readonly user: Model<User>) { }

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

  async findById(id: object): Promise<User> {
    return await this.user.findById(id).exec();
  }

  // async update(ID: number, newValue: IUser): Promise<IUser> {
  //   const user = await this.userModel.findById(ID).exec();

  //   if (!user._id) {
  //     debug('user not found');
  //   }

  //   await this.userModel.findByIdAndUpdate(ID, newValue).exec();
  //   return await this.userModel.findById(ID).exec();
  // }

  // async delete(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
  //   return await this.userRepository.d
  // }
}
