import {
  ApiBearerAuth,
  ApiOperation,
  ApiUseTags,
} from '@nestjs/swagger';
import {
  UseGuards, Controller,
  Request, Body, Post,
  BadRequestException
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
import { NotificationService } from './../notification/notification.service';
import { Roles } from './../../common/decorators/roles.decorator';
import { RolesGuard } from './../../common/guards/roles.guard';
import { MasterGuard } from './../../common/guards/master.guard';

@ApiBearerAuth()
@ApiUseTags('Message')
@Controller('messages')
export class MessageAdminController {
  constructor(
    private readonly messageService: MessageService,
    private readonly roomService: RoomService,
    private readonly userService: UserService,
    private readonly pushService: PushService,
    private readonly notificationService: NotificationService
  ) { }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Post('/admin')
  @ApiOperation({ title: 'Send message' })
  async create(@Body() createMessageDto: CreateMessageDto, @Request() req): Promise<Message> {
    this.roomService.updatLastMsgByRoomId(createMessageDto.room, createMessageDto.text);
    // find user and check pushtoken    
    let to = await this.userService.findById(createMessageDto.to);
    let type = 'msg';
    const user: User = await this.userService.findById(createMessageDto.user);
    if (null != user && null != to && null != to.pushToken && to.isActivePush) {
      // send push
      this.pushService.send(user, to, createMessageDto.text, createMessageDto.text, createMessageDto.room, type, createMessageDto.image);
    }
    this.notificationService.create(new CreateNotificationDto(createMessageDto.room, createMessageDto.to, type));
    return this.messageService.create(createMessageDto);
  }

  @UseGuards(MasterGuard)
  @Roles('ADMIN')
  @Post('/admin/send')
  @ApiOperation({ title: 'Send message by lambda' })
  async send(@Body() createMessageDto: CreateMessageDto, @Request() req): Promise<Message> {
    // find user and check pushtoken    
    const to = await this.userService.findById(createMessageDto.to);
    if (null === to) throw new BadRequestException(`this is invalid data ${createMessageDto}`);
    
    const type = 'msg';
    const user: User = await this.userService.findById(createMessageDto.user);
    this.roomService.updatLastMsgByRoomId(createMessageDto.room, createMessageDto.text);
    if (null != user && null != to && null != to.pushToken && to.isActivePush) {
      // send push
      this.pushService.send(user, to, createMessageDto.text, createMessageDto.text, createMessageDto.room, type, createMessageDto.image);
    }
    this.notificationService.create(new CreateNotificationDto(createMessageDto.room, createMessageDto.to, type));
    return this.messageService.create(createMessageDto);
  }
}
