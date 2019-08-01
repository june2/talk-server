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
import { RoomService } from './../room/room.service';
import { Message } from './message.interface';

@ApiBearerAuth()
@ApiUseTags('Message')
@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService, private readonly roomService: RoomService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ title: 'Send message' })
  async create(@Body() createMessageDto: CreateMessageDto, @Request() req): Promise<Message> {
    createMessageDto.user = req.user.id;
    this.roomService.updatLastMsgByRoomId(createMessageDto.room, createMessageDto.text);
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
