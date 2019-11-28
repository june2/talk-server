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
import { CreateNotificationDto } from './../notification/notification.dto';
import { UserService } from './../user/user.service';
import { PushService } from '../../common/push/push.service';
import { SfService } from '../../common/stepfunction/sf.service';

@ApiBearerAuth()
@ApiUseTags('Room')
@Controller('rooms')
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    private readonly messageService: MessageService,
    private readonly pushService: PushService,
    private readonly notificationService: NotificationService,
    private readonly sfService: SfService,
    private readonly userService: UserService
  ) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ title: 'Create room' })
  async create(@Body() reqRoomDto: ReqRoomDto, @Request() req): Promise<Room> {
    // check room 
    let user = req.user;
    let room: Room = await this.roomService.findByUsers(user.id, reqRoomDto.userId);
    if (!room) {
      // check point
      if (user.point < 50) throw new UnauthorizedException();
      // create room
      room = await this.roomService.create(new CreateRoomDto(
        [user.id, reqRoomDto.userId],
        reqRoomDto.lastMsg
      ));
      // substract point 
      this.userService.updatePoint(user.id, (user.point - 50));
    } else {
      this.roomService.updatLastMsgByRoomId(room.id, reqRoomDto.lastMsg);
    }
    let type = 'room';
    this.notificationService.create(new CreateNotificationDto(room.id, reqRoomDto.userId, type));
    this.messageService.create(new CreateMessageDto(room.id, user.id, reqRoomDto.lastMsg));
    // find user and check pushtoken
    let to = await this.userService.findById(reqRoomDto.userId);
    // fake user     
    if (to.state === 'SAMPLE' || to.state === 'DATALK') {      
      this.sfService.excute(req.user, to, reqRoomDto.lastMsg, room.id);
    }
    if (null != to && null != to.pushToken && to.isActivePush) {
      // send push
      let body = `${user.name}님이 메시지를 보냈습니다.`;
      this.pushService.send(user, to, body, reqRoomDto.lastMsg, room.id, type);
    }
    return room;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ title: 'Get rooms by userId' })
  async findAll(@Query('page') page: number, @Query('limit') limit: number, @Request() req): Promise<Room[]> {
    let userId = req.user.id;
    this.userService.updateLastLogin(userId);
    return this.roomService.findByUserId(userId, page, limit);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id/messages')
  async findById(@Param('id') id: string, @Query('offset') offset: number, @Query('limit') limit: number, @Request() req): Promise<Message[]> {
    // validation
    let room: Room = await this.roomService.checkUserInRoom(id, req.user.id);
    if (null === room) throw new UnauthorizedException();
    this.notificationService.deleteByUserAndRoom(room.id, req.user.id);
    return this.roomService.findMessageByRoomId(id, offset, limit);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async deleteById(@Param('id') id: string, @Request() req): Promise<Room> {
    // validation
    let room: Room = await this.roomService.checkUserInRoom(id, req.user.id);
    if (null === room) throw new UnauthorizedException();
    let arr: Array<string> = room.lefts;
    arr.push(req.user.id);
    this.messageService.create(new CreateMessageDto(room.id, req.user.id, `${req.user.name}님이 방을 나갔습니다.`, true));
    return this.roomService.updatLeftByRoomId(id, arr);
  }
}
