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
  Request, Param, Body, Query,
  Get, Post, Put,
  UnauthorizedException, BadRequestException, NotFoundException,
  UseInterceptors, UploadedFile
} from '@nestjs/common';
import { multerOptions } from '../../common/multer/multer.config';
import { FileInterceptor } from "@nestjs/platform-express"
import { AuthGuard } from '@nestjs/passport';
import * as mongoose from 'mongoose';
import { UserService } from './user.service';
import { User } from './user.interface';
import { CreateUserDto, UpdateUserDto, UpdateUserPushTokenDto } from './user.dto';

@ApiBearerAuth()
@ApiUseTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ title: 'Get user' })
  findAll(@Query('offset') offset: number, @Query('limit') limit: number, @Request() req): Promise<User[]> {
    let userId = req.user.id;
    return this.userService.findAll(userId, offset, limit);
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
  @UseInterceptors(FileInterceptor('file', multerOptions))
  uploadFile(@UploadedFile() file, @Request() req): Promise<User> {
    let images = [...req.user.images, { thumbnail: file.filename, full: file.path }];
    return this.userService.upload(req.user.id, images);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/:id/updateLastLogin')
  updateLastLogin(@Param('id') id: string, @Request() req) {
    this.userService.updateLastLogin(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/:id/registerPushToken')
  registerPushToken(@Param('id') id: string, @Request() req, @Body() updateUserPushTokenDto: UpdateUserPushTokenDto) {
    this.userService.registerPushToken(req.user.id, updateUserPushTokenDto);
  }
}
