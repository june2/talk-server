import { AuthService } from './auth.service';
import { UserService } from './../user/user.service';
import { CreateUserDto } from './../user/user.dto';
import { AuthLoginDto } from './auth.dto';
import { NotificationService } from '../notification/notification.service';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    private readonly notificationService;
    constructor(authService: AuthService, userService: UserService, notificationService: NotificationService);
    register(createUserDto: CreateUserDto): Promise<any>;
    login(authLoginDto: AuthLoginDto): Promise<any>;
    getProfile(req: any): Promise<{
        id: any;
        state: any;
        point: any;
        lastLoginAt: any;
        location: any;
        email: any;
        images: any;
        createdAt: any;
        updatedAt: any;
        intro: any;
        name: any;
        gender: any;
        birthday: any;
        isActivePush: any;
        tabBadgeCount: number;
    }>;
}
