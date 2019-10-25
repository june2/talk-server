import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import {
  UseGuards, Controller,
  Request, Body, Query, Param,
  UnauthorizedException,
  Get, Post, Delete
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReqRoomDto, CreateRoomDto } from './room.dto';
import { RoomService } from './room.service';
import { Room } from './room.interface';
import { MessageService } from '../message/message.service';
import { CreateMessageDto } from '../message/message.dto';
import { Message } from '../message/message.interface';
import { NotificationService } from '../notification/notification.service';
import { UserService } from '../user/user.service';
import { PushService } from '../../common/push/push.service';
import { Roles } from './../../common/decorators/roles.decorator';
import { RolesGuard } from './../../common/guards/roles.guard';

@ApiBearerAuth()
@ApiUseTags('Room')
@Controller('rooms')
export class RoomAdminController {
  constructor(
    private readonly roomService: RoomService,
    private readonly messageService: MessageService,
    private readonly pushService: PushService,
    private readonly notificationService: NotificationService,
    private readonly userService: UserService
  ) { }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Get('/admin')
  @ApiOperation({ title: 'Get rooms by userId' })
  async findAll(@Query('offset') offset: number, @Query('limit') limit: number,
    @Query('sort') sort: any, @Query('filter') filter: any,
    @Request() req): Promise<Room[]> {
    return this.roomService.findAll(offset, limit, sort);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Get('/:id/admin')
  async findById(@Param('id') id: string, @Query('offset') offset: number, @Query('limit') limit: number, @Request() req): Promise<Room> {    
    return this.roomService.findById(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Get('/:id/messages/admin')
  async findMessagesById(@Param('id') id: string, @Query('offset') offset: number, @Query('limit') limit: number, @Request() req): Promise<Message[]> {
    // validation
    return this.roomService.findMessageByRoomId(id, offset, limit);
  }

  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Roles('ADMIN')
  // @Get('/:id/messages/admin')
  // async findById(@Param('id') id: string, @Query('offset') offset: number, @Query('limit') limit: number, @Request() req): Promise<Message[]> {
  //   // validation
  //   let room: Room = await this.roomService.checkUserInRoom(id, req.user.id);
  //   if (null === room) throw new UnauthorizedException();
  //   this.notificationService.deleteByUserAndRoom(room.id, req.user.id);
  //   return this.roomService.findMessageByRoomId(id, offset, limit);
  // }

}