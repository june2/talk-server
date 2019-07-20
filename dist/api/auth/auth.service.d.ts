import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { CreateUserDto } from './../user/user.dto';
import { UserService } from './../user/user.service';
import { User } from './../user/user.interface';
export declare class AuthService {
    private readonly jwtService;
    private readonly userService;
    constructor(jwtService: JwtService, userService: UserService);
    register(createUserDto: CreateUserDto): Promise<User>;
    createToken(user: User): Promise<{
        expiresIn: number;
        accessToken: string;
    }>;
    validateUser(payload: JwtPayload): Promise<User>;
}
