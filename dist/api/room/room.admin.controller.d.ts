import { RoomService } from './room.service';
import { Room } from './room.interface';
import { Message } from '../message/message.interface';
export declare class RoomAdminController {
    private readonly roomService;
    constructor(roomService: RoomService);
    findAll(page: number, limit: number, sort: any, filter: any, req: any): Promise<Room[]>;
    findById(id: string, req: any): Promise<Room>;
    findMessagesById(id: string, page: number, limit: number, req: any): Promise<Message[]>;
}
