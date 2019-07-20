import { UserService } from './user.service';
import { User } from './user.interface';
import { CreateUserDto, UpdateUserDto } from './user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<User[]>;
    findById(id: string, req: any): Promise<User>;
    create(createUserDto: CreateUserDto): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto, req: any): Promise<User>;
    uploadFile(file: any, req: any): Promise<User>;
}
