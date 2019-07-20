import { ReqRoomDto } from './room.dto';
import { RoomService } from './room.service';
import { Room } from './room.interface';
import { Message } from './../message/message.interface';
export declare class RoomController {
    private readonly RoomService;
    constructor(RoomService: RoomService);
    create(reqRoomDto: ReqRoomDto, req: any): Promise<void>;
    findAll(offset: number, limit: number, req: any): Promise<Room[]>;
    findById(id: string, offset: number, limit: number, req: any): Promise<Message[]>;
}
