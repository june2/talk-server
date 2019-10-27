import { UserService } from './user.service';
import { User } from './user.interface';
import { UpdateUserAdminDto } from './user.dto';
export declare class UserAdminController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(page: number, limit: number, sort: any, filter: any, req: any): Promise<User[]>;
    findById(id: string, req: any): Promise<User>;
    update(id: string, updateUserAdminDto: UpdateUserAdminDto, req: any): Promise<User>;
}
