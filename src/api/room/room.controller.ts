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
import { PushService } from '../../common/push/push.service';

@ApiBearerAuth()
@ApiUseTags('Room')
@Controller('rooms')
export class RoomController {
  constructor(
    private readonly RoomService: RoomService,
    private readonly messageService: MessageService,
    private readonly pushService: PushService
  ) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ title: 'Create room' })
  async create(@Body() reqRoomDto: ReqRoomDto, @Request() req): Promise<Room> {
    let res = await this.RoomService.create(new CreateRoomDto(
      [req.user.id, reqRoomDto.userId],
      reqRoomDto.lastMsg
    ));
    this.messageService.create(new CreateMessageDto(res.id, req.user.id, reqRoomDto.lastMsg));
    this.pushService.send();
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
    let res: Room = await this.RoomService.checkUserInRoom(id, req.user.id);
    if (null === res) throw new UnauthorizedException();
    return this.RoomService.findMessageByRoomId(id, offset, limit);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async deleteById(@Param('id') id: string, @Request() req): Promise<Room> {
    // validation
    let res: Room = await this.RoomService.checkUserInRoom(id, req.user.id);
    if (null === res) throw new UnauthorizedException();
    let arr: Array<string> = res.lefts;
    arr.push(req.user.id);
    return this.RoomService.updatLeftByRoomId(id, arr);
  }
}
