import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
  ApiImplicitFile,
  ApiImplicitParam
} from '@nestjs/swagger';
import {
  UseGuards, Controller,
  Request, Response, Param, Body, Query,
  Get, Post, Put,
  UnauthorizedException, BadRequestException, NotFoundException,
  UseInterceptors, UploadedFile
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as mongoose from 'mongoose';
import { Roles } from './../../common/decorators/roles.decorator';
import { RolesGuard } from './../../common/guards/roles.guard';
import { UserService } from './user.service';
import { User } from './user.interface';
import { CreateUserDto, UpdateUserAdminDto, UpdateUserPushTokenDto } from './user.dto';

@ApiBearerAuth()
@ApiUseTags('User')
@Controller('users')
export class UserAdminController {
  constructor(
    private readonly userService: UserService) { }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Get('/admin')
  @ApiOperation({ title: 'Get user' })
  findAll(@Query('page') page: number, @Query('limit') limit: number,
    @Query('sort') sort: any, @Query('filter') filter: any,
    @Request() req): Promise<User[]> {
    let userId = req.user.id;
    return this.userService.findAll(userId, page, limit, JSON.parse(sort));
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Get('/update/admin')
  async updateLastLogin(@Request() req): Promise<void> {    
    this.userService.updateUserLastLogin();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Get('/:id/admin')
  @ApiOperation({ title: 'Get user by Id' })
  findById(@Param('id') id: string, @Request() req): Promise<User> {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new BadRequestException("this is not objectId");
    return this.userService.findById(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Put('/:id/admin')
  async update(@Param('id') id: string, @Body() updateUserAdminDto: UpdateUserAdminDto, @Request() req): Promise<User> {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new BadRequestException("this is not objectId");
    return this.userService.update(id, updateUserAdminDto);
  }  
}
