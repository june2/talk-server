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
  Get, Post,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReqRoomDto, CreateRoomDto } from './room.dto';
import { RoomService } from './room.service';
import { Room } from './room.interface';
import { MessageService } from './../message/message.service';
import { CreateMessageDto } from './../message/message.dto';
import { Message } from './../message/message.interface';

@ApiBearerAuth()
@ApiUseTags('Room')
@Controller('rooms')
export class RoomController {
  constructor(private readonly RoomService: RoomService, private readonly messageService: MessageService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ title: 'Create room' })
  async create(@Body() reqRoomDto: ReqRoomDto, @Request() req): Promise<Room> {
    let createRoomDto = new CreateRoomDto();
    createRoomDto.lastMsg = reqRoomDto.lastMsg;
    createRoomDto.users.push(req.user.id);
    createRoomDto.users.push(reqRoomDto.userId);
    let res = await this.RoomService.create(createRoomDto);
    let createMessageDto = new CreateMessageDto();
    createMessageDto.room = res.id;
    createMessageDto.user = req.user.id;
    createMessageDto.text = reqRoomDto.lastMsg;
    this.messageService.create(createMessageDto);
    return res;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ title: 'Get rooms by userId' })
  async findAll(@Query('offset') offset: number, @Query('limit') limit: number, @Request() req): Promise<Room[]> {
    let userId = req.user.id;
    return this.RoomService.findByUserId(userId, offset, limit);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id/messages')
  async findById(@Param('id') id: string, @Query('offset') offset: number, @Query('limit') limit: number, @Request() req): Promise<Message[]> {
    // validation
    let res = await this.RoomService.checkUserInRoom(id, req.user.id);
    if (!res) throw new UnauthorizedException();
    return this.RoomService.findMessageByRoomId(id, offset, limit);
  }
}
