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
import { multerOptions } from '../../common/multer/multer.config';
import { FileInterceptor } from "@nestjs/platform-express"
import { AuthGuard } from '@nestjs/passport';
import * as mongoose from 'mongoose';
import * as moment from 'moment';
import { UserService } from './user.service';
import { User } from './user.interface';
import { CreateUserDto, UpdateUserDto, UpdateUserPushTokenDto, AddBlockUserDto, ReqRewardDto } from './user.dto';

@ApiBearerAuth()
@ApiUseTags('User')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ title: 'Get user' })
  findAll(@Query('page') page: number, @Query('limit') limit: number, @Query('q') q: string, @Request() req): Promise<User[]> {
    let userId = req.user.id;
    this.userService.updateLastLogin(userId);
    let blocks = (req.user.blocks) ? req.user.blocks : [];
    return this.userService.findActive(userId, blocks, page, limit, q);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  @ApiOperation({ title: 'Get user by Id' })
  findById(@Param('id') id: string, @Request() req): Promise<User> {
    if (id === 'me') return req.user;
    else {
      if (!mongoose.Types.ObjectId.isValid(id)) throw new BadRequestException("this is not objectId");
      return this.userService.findById(id);
    }
  }

  @ApiOperation({ title: 'Create user' })
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Request() req): Promise<User> {
    // if (id === 'me') id = req.user.id;
    // else {
    //   if (!mongoose.Types.ObjectId.isValid(id)) throw new BadRequestException("this is not objectId");
    //   const user = await this.userService.findById(id);
    //   if (user) throw new NotFoundException('Customer does not exist!');
    // }
    if (!req.user) throw new UnauthorizedException();
    return this.userService.update(req.user.id, updateUserDto);
  }

  @ApiImplicitFile({ name: 'file', required: true, description: 'files to upload' })
  @ApiImplicitParam({ name: 'id', type: 'string', required: true, description: 'user id' })
  @UseGuards(AuthGuard('jwt'))
  @Post('/:id/upload')
  @UseInterceptors(FileInterceptor('upload', multerOptions('profile')))
  uploadFile(@UploadedFile() file, @Request() req): Promise<User> {
    let images = [...req.user.images, file.Location];
    return this.userService.upload(req.user.id, images);
  }

  @ApiImplicitFile({ name: 'file', required: true, description: 'files to upload' })
  @ApiImplicitParam({ name: 'id', type: 'string', required: true, description: 'user id' })
  @UseGuards(AuthGuard('jwt'))
  @Post('/:id/upload/image')
  @UseInterceptors(FileInterceptor('upload', multerOptions('message')))
  uploadImage(@UploadedFile() file, @Request() req): any {
    return { image: file.Location };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/:id/block')
  blockUser(@Request() req, @Body() addBlockUserDto: AddBlockUserDto): any {
    let arr = (req.user.blocks) ? req.user.blocks : [];
    let blocks = [...arr, ...[require('mongodb').ObjectID(addBlockUserDto.blockId)]];
    return this.userService.addBlockUser(req.user.id, blocks);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/:id/updateLastLogin')
  updateLastLogin(@Param('id') id: string, @Request() req): any {
    this.userService.updateLastLogin(req.user.id);
    let today = moment(new Date()).format('YYYY-MM-DD');
    let isAfter = moment(req.user.lastLoginAt).isBefore(today);
    let point = req.user.point;
    if (isAfter) {
      this.userService.updatePoint(req.user.id, (point + 50));
      return { reward: true, point: point + 50 };
    } else {
      return { reward: false, point: point };
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/:id/updateRewardPoint')
  updateRewardPoint(@Param('id') id: string, @Request() req, @Body() reqRewardDto: ReqRewardDto): any {
    let point = req.user.point;
    let reward = 10;
    if (reqRewardDto.type === 'ATT') {
      reward = 50;
    }
    this.userService.updatePoint(req.user.id, (point + reward));
    return { reward: true, point: point + reward };
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/:id/leave')
  leave(@Param('id') id: string, @Request() req) {
    this.userService.updateState(req.user.id, 'LEAVE');
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/:id/registerPushToken')
  registerPushToken(@Param('id') id: string, @Request() req, @Body() updateUserPushTokenDto: UpdateUserPushTokenDto) {
    this.userService.registerPushToken(req.user.id, updateUserPushTokenDto);
  }
}
