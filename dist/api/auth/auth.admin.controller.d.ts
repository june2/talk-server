import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { AuthLoginDto } from './auth.dto';
export declare class AuthAdminController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    login(authLoginDto: AuthLoginDto): Promise<any>;
}
