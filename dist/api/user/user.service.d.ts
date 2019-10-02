import { PaginateModel } from 'mongoose-paginate-v2';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto, UpdateUserPushTokenDto } from './user.dto';
import { User } from './user.interface';
export declare class UserService {
    private readonly user;
    private readonly users;
    constructor(user: Model<User>, users: PaginateModel<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(id: string, offset?: number, limit?: number): Promise<User[]>;
    findOne(options: object): Promise<User>;
    findById(id: string): Promise<User>;
    update(id: string, newValue: UpdateUserDto): Promise<User>;
    upload(id: string, images: object): Promise<User>;
    updateLastLogin(id: string): Promise<void>;
    registerPushToken(id: string, newValue: UpdateUserPushTokenDto): Promise<void>;
}
