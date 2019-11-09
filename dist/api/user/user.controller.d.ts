import { UserService } from './user.service';
import { User } from './user.interface';
import { CreateUserDto, UpdateUserDto, UpdateUserPushTokenDto } from './user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(page: number, limit: number, q: string, req: any): Promise<User[]>;
    findById(id: string, req: any): Promise<User>;
    create(createUserDto: CreateUserDto): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto, req: any): Promise<User>;
    uploadFile(file: any, req: any): Promise<User>;
    uploadImage(file: any, req: any): any;
    updateLastLogin(id: string, req: any): any;
    leave(id: string, req: any): void;
    registerPushToken(id: string, req: any, updateUserPushTokenDto: UpdateUserPushTokenDto): void;
}
