import { PaginateModel } from 'mongoose-paginate-v2';
import { Model } from 'mongoose';
import { CreateRoomDto } from './room.dto';
import { Room } from './room.interface';
import { Message } from './../message/message.interface';
export declare class RoomService {
    private readonly room;
    private readonly rooms;
    private readonly message;
    constructor(room: Model<Room>, rooms: PaginateModel<Room>, message: PaginateModel<Message>);
    create(createRoomDto: CreateRoomDto): Promise<Room>;
    findAll(): Promise<Room[]>;
    findById(id: string): Promise<Room>;
    findByUserId(id: string, offset?: number, limit?: number): Promise<Room[]>;
    findMessageByRoomId(id: string, offset?: number, limit?: number): Promise<Message[]>;
    updatLastMsgByRoomId(id: string, lastMsg: string): Promise<Room>;
    updatLeftByRoomId(id: string, arr: Array<string>): Promise<Room>;
    checkUserInRoom(id: string, userId: string): Promise<Room>;
}
