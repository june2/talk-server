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
import { ReqRoomDto, CreateRoomDto } from './room.dto';
import { RoomService } from './room.service';
import { Room } from './room.interface';

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

  @Get('/:id')
  async findById(@Param('id') id: string): Promise<Room> {
    return this.RoomService.findById(id);
  }

  @Get()
  async findAll(): Promise<Room[]> {
    return this.RoomService.findAll();
  }
}
