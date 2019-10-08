import { UserService } from './user.service';
import { User } from './user.interface';
import { CreateUserDto, UpdateUserDto, UpdateUserPushTokenDto } from './user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(offset: number, limit: number, req: any): Promise<User[]>;
    findById(id: string, req: any): Promise<User>;
    create(createUserDto: CreateUserDto): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto, req: any): Promise<User>;
    uploadFile(file: any, req: any): Promise<User>;
    updateLastLogin(id: string, req: any): void;
    leave(id: string, req: any): void;
    registerPushToken(id: string, req: any, updateUserPushTokenDto: UpdateUserPushTokenDto): void;
}
