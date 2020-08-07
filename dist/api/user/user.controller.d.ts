import { UserService } from './user.service';
import { User } from './user.interface';
import { CreateUserDto, UpdateUserDto, UpdateUserPushTokenDto, AddBlockUserDto, ReqRewardDto } from './user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(page: number, limit: number, q: string, req: any): Promise<User[]>;
    findById(id: string, req: any): Promise<User>;
    create(createUserDto: CreateUserDto): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto, req: any): Promise<User>;
    uploadFile(file: any, req: any): Promise<User>;
    uploadImage(file: any, req: any): any;
    blockUser(req: any, addBlockUserDto: AddBlockUserDto): any;
    updateLastLogin(id: string, req: any): any;
    updateRewardPoint(id: string, req: any, reqRewardDto: ReqRewardDto): any;
    leave(id: string, req: any): void;
    registerPushToken(id: string, req: any, updateUserPushTokenDto: UpdateUserPushTokenDto): void;
}
