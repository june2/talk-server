import {
  ApiBearerAuth,
  ApiOperation,
  ApiUseTags,
} from '@nestjs/swagger';
import {
  UseGuards, Controller,
  Request, Body,
  Get, Post,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateMessageDto } from './message.dto';
import { MessageService } from './message.service';
import { Message } from './message.interface';
import { RoomService } from './../room/room.service';
import { UserService } from './../user/user.service';
import { NotificationService } from './../notification/notification.service';
import { CreateNotificationDto } from './../notification/notification.dto';
import { PushService } from '../../common/push/push.service';
import { SfService } from '../../common/stepfunction/sf.service';

@ApiBearerAuth()
@ApiUseTags('Message')
@Controller('messages')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly roomService: RoomService,
    private readonly userService: UserService,
    private readonly pushService: PushService,
    private readonly sfService: SfService,
    private readonly notificationService: NotificationService
  ) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ title: 'Send message' })
  async create(@Body() createMessageDto: CreateMessageDto, @Request() req): Promise<Message> {
    createMessageDto.user = req.user.id;
    this.roomService.updatLastMsgByRoomId(createMessageDto.room, createMessageDto.text);
    // find user and check pushtoken    
    let to = await this.userService.findById(createMessageDto.to);
    let type = 'msg';
    // fake user 
    console.log("to : ", to);
    if (to.state === 'SAMPLE' || to.state === 'DATALK') {
      console.log("step function!")
      this.sfService.excute(req.user, to, createMessageDto.text, createMessageDto.room);
    }
    if (null != to && null != to.pushToken && to.isActivePush) {
      // send push
      this.pushService.send(req.user, to, createMessageDto.text, createMessageDto.text, createMessageDto.room, type, createMessageDto.image);
    }
    this.notificationService.create(new CreateNotificationDto(createMessageDto.room, to.id, type));
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
