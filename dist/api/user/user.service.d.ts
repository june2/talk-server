import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.interface';
export declare class UserService {
    private readonly user;
    constructor(user: Model<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(options: object): Promise<User>;
    findById(id: string): Promise<User>;
    update(id: string, newValue: UpdateUserDto): Promise<User>;
    upload(id: string, filename: string, path: string): Promise<User>;
}
