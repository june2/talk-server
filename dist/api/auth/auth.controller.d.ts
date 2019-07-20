import { AuthService } from './auth.service';
import { UserService } from './../user/user.service';
import { CreateUserDto } from './../user/user.dto';
import { AuthLoginDto } from './auth.dto';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    register(createUserDto: CreateUserDto): Promise<any>;
    login(authLoginDto: AuthLoginDto): Promise<any>;
    getProfile(req: any): any;
}
