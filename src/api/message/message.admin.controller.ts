import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import {
  UseGuards, Controller,
  Request, Body, Query, Param,
  Get, Post,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateMessageDto } from './message.dto';
import { MessageService } from './message.service';
import { Message } from './message.interface';
import { RoomService } from '../room/room.service';
import { PushService } from '../../common/push/push.service';
import { CreateNotificationDto } from '../notification/notification.dto';
import { User } from '../user/user.interface';
import { UserService } from '../user/user.service';
import { Roles } from './../../common/decorators/roles.decorator';
import { RolesGuard } from './../../common/guards/roles.guard';

@ApiBearerAuth()
@ApiUseTags('Message')
@Controller('messages')
export class MessageAdminController {
  constructor(
    private readonly messageService: MessageService,
    private readonly roomService: RoomService,
    private readonly userService: UserService,
    private readonly pushService: PushService
  ) { }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Post('/admin')
  @ApiOperation({ title: 'Send message' })
  async create(@Body() createMessageDto: CreateMessageDto, @Request() req): Promise<Message> {
    this.roomService.updatLastMsgByRoomId(createMessageDto.room, createMessageDto.text);
    // find user and check pushtoken    
    let to = await this.userService.findById(createMessageDto.to);
    const user: User = await this.userService.findById(createMessageDto.user);
    if (null != user && null != to && null != to.pushToken && to.isActivePush) {
      // send push
      this.pushService.send(user, to, createMessageDto.text, createMessageDto.text, createMessageDto.room, 'msg');
    }
    return this.messageService.create(createMessageDto);
  }
}