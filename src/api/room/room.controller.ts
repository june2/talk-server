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
const { ObjectId } = require('mongodb'); // or ObjectID 
import { ReqRoomDto, CreateRoomDto } from './room.dto';
import { RoomService } from './room.service';
import { Room } from './room.interface';
import { Message } from './../message/message.interface';

@ApiBearerAuth()
@ApiUseTags('Room')
@Controller('rooms')
export class RoomController {
  constructor(private readonly RoomService: RoomService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ title: 'Create room' })
  async create(@Body() reqRoomDto: ReqRoomDto, @Request() req) {
    let createRoomDto = new CreateRoomDto();
    createRoomDto.lastMsg = reqRoomDto.lastMsg;
    createRoomDto.users.push(req.user.id);
    createRoomDto.users.push(reqRoomDto.userId);
    this.RoomService.create(createRoomDto);
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
