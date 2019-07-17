import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { jwtConstants } from './constants';
import { CreateUserDto } from './../user/user.dto';
import { UserService } from './../user/user.service';
import { User } from './../user/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) { }

  async register(createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto)
  }

  async createToken(user: User) {
    return {
      expiresIn: jwtConstants.expiresIn,
      accessToken: this.jwtService.sign({ id: user.id, email: user.email })
    };
  }

  async validateUser(payload: JwtPayload): Promise<User> {    
    return await this.userService.findById(payload.id);
  }
}

