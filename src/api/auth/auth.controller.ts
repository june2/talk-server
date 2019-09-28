import * as crypto from 'crypto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { Controller, Get, Post, UseGuards, Request, Body, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserService } from './../user/user.service';
import { CreateUserDto } from './../user/user.dto';
import { AuthLoginDto } from './auth.dto';

@ApiBearerAuth()
@ApiUseTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) { }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.authService.register(createUserDto);
  }

  @Post('/login')
  @ApiResponse({ status: 201, description: 'Successful Login' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() authLoginDto: AuthLoginDto): Promise<any> {    
    const user = await this.userService.findOne({
      email: authLoginDto.email,
      password: crypto.createHmac('sha256', authLoginDto.password).digest('hex')
    });
    if (!user) {
      throw new UnauthorizedException('Wrong login combination!');
    }
    return await this.authService.createToken(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
}
