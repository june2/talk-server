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
import { User } from '../user/user.interface';
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
    private readonly userService: UserService
  ) { }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Get('/admin')
  @ApiOperation({ title: 'Get rooms by userId' })
  async findAll(@Query('page') page: number, @Query('limit') limit: number,
    @Query('sort') sort: any, @Query('filter') filter: any,
    @Request() req): Promise<Room[]> {
    return this.roomService.findAll(page, limit, sort);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Get('/:id/admin')
  async findById(@Param('id') id: string, @Request() req): Promise<Room> {
    return this.roomService.findById(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Get('/:id/messages/admin')
  async findMessagesById(@Param('id') id: string, @Query('page') page: number, @Query('limit') limit: number, @Request() req): Promise<Message[]> {
    // validation
    return this.roomService.findMessageByRoomId(id, page, limit);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Delete('/:id/admin')
  async deleteById(@Param('id') id: string, @Body() reqRoomDto: ReqRoomDto): Promise<Room> {    
    // validation
    let userId = reqRoomDto.userId;
    let room: Room = await this.roomService.checkUserInRoom(id, userId);
    if (null === room) throw new UnauthorizedException();
    let arr: Array<string> = room.lefts;
    arr.push(userId);
    // // 방 나가기 messge 추가
    let user: User = await this.userService.findById(userId);
    let msg = `${user.name}님이 방을 나갔습니다.`;
    this.messageService.create(new CreateMessageDto(room.id, userId, msg, true));
    return this.roomService.updatLeftByRoomId(id, arr, msg);    
  }
}
