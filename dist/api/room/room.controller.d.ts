import { ReqRoomDto } from './room.dto';
import { RoomService } from './room.service';
import { Room } from './room.interface';
import { MessageService } from './../message/message.service';
import { Message } from './../message/message.interface';
export declare class RoomController {
    private readonly RoomService;
    private readonly messageService;
    constructor(RoomService: RoomService, messageService: MessageService);
    create(reqRoomDto: ReqRoomDto, req: any): Promise<Room>;
    findAll(offset: number, limit: number, req: any): Promise<Room[]>;
    findById(id: string, offset: number, limit: number, req: any): Promise<Message[]>;
    deleteById(id: string, req: any): Promise<Room>;
}
