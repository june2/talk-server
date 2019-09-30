import { ReqRoomDto } from './room.dto';
import { RoomService } from './room.service';
import { Room } from './room.interface';
import { MessageService } from '../message/message.service';
import { Message } from '../message/message.interface';
import { PushService } from '../../common/push/push.service';
export declare class RoomController {
    private readonly RoomService;
    private readonly messageService;
    private readonly pushService;
    constructor(RoomService: RoomService, messageService: MessageService, pushService: PushService);
    create(reqRoomDto: ReqRoomDto, req: any): Promise<Room>;
    findAll(offset: number, limit: number, req: any): Promise<Room[]>;
    findById(id: string, offset: number, limit: number, req: any): Promise<Message[]>;
    deleteById(id: string, req: any): Promise<Room>;
}
