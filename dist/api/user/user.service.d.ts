import { PaginateModel } from 'mongoose-paginate-v2';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto, UpdateUserPushTokenDto, CreateUserSampleDto } from './user.dto';
import { User } from './user.interface';
export declare class UserService {
    private readonly user;
    private readonly users;
    constructor(user: Model<User>, users: PaginateModel<User>);
    readonly userRepo: Model<User>;
    create(createUserDto: CreateUserDto): Promise<User>;
    createAll(arr: CreateUserSampleDto[]): Promise<User[]>;
    findAll(id: string, page?: number, limit?: number, sort?: any, q?: any): Promise<User[]>;
    findActive(id: string, blocks: any[], page: number, limit: number, q: string, sort?: any): Promise<User[]>;
    findOne(options: object): Promise<User>;
    findById(id: string): Promise<User>;
    update(id: string, newValue: UpdateUserDto): Promise<User>;
    upload(id: string, images: object): Promise<User>;
    updateLastLogin(id: string): Promise<void>;
    updateState(id: string, state: string): Promise<void>;
    updatePoint(id: string, point: number): Promise<void>;
    updateReward(id: string): Promise<void>;
    addBlockUser(id: string, blocks: any[]): Promise<void>;
    registerPushToken(id: string, newValue: UpdateUserPushTokenDto): Promise<void>;
    deleteSample(state: string): Promise<void>;
    updateUserLastLogin(): Promise<void>;
    updateUserLastLoginUser(): Promise<void>;
}
