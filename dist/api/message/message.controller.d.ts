import { CreateMessageDto } from './message.dto';
import { MessageService } from './message.service';
import { RoomService } from './../room/room.service';
import { Message } from './message.interface';
export declare class MessageController {
    private readonly messageService;
    private readonly roomService;
    constructor(messageService: MessageService, roomService: RoomService);
    create(createMessageDto: CreateMessageDto, req: any): Promise<Message>;
    findAll(req: any): Promise<Message[]>;
}
