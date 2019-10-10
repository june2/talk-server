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
import { RoomService } from './../room/room.service';
import { PushService } from '../../common/push/push.service';
import { CreateNotificationDto } from './../notification/notification.dto';
import { UserService } from './../user/user.service';

@ApiBearerAuth()
@ApiUseTags('Message')
@Controller('messages')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly roomService: RoomService,
    private readonly userService: UserService,
    private readonly pushService: PushService
  ) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ title: 'Send message' })
  async create(@Body() createMessageDto: CreateMessageDto, @Request() req): Promise<Message> {
    createMessageDto.user = req.user.id;
    this.roomService.updatLastMsgByRoomId(createMessageDto.room, createMessageDto.text);
    // find user and check pushtoken    
    let to = await this.userService.findById(createMessageDto.to);    
    if (null != to && null != to.pushToken && to.isActivePush) {
      // send push
      this.pushService.send(req.user.name, to, createMessageDto.text, createMessageDto.room, 'msg');
    }
    return this.messageService.create(createMessageDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ title: 'Get messages by userId' })
  async findAll(@Request() req): Promise<Message[]> {
    let userId = req.user.id;
    return this.messageService.findByUserId(userId);
  }
}
