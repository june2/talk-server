import { ReqRoomDto } from './room.dto';
import { RoomService } from './room.service';
import { Room } from './room.interface';
import { MessageService } from '../message/message.service';
import { Message } from '../message/message.interface';
import { UserService } from '../user/user.service';
export declare class RoomAdminController {
    private readonly roomService;
    private readonly messageService;
    private readonly userService;
    constructor(roomService: RoomService, messageService: MessageService, userService: UserService);
    findAll(page: number, limit: number, sort: any, filter: any, req: any): Promise<Room[]>;
    findById(id: string, req: any): Promise<Room>;
    findMessagesById(id: string, page: number, limit: number, req: any): Promise<Message[]>;
    deleteById(id: string, reqRoomDto: ReqRoomDto): Promise<Room>;
}
