import { CreateMessageDto } from './message.dto';
import { MessageService } from './message.service';
import { Message } from './message.interface';
import { RoomService } from './../room/room.service';
import { PushService } from '../../common/push/push.service';
export declare class MessageController {
    private readonly messageService;
    private readonly roomService;
    private readonly pushService;
    constructor(messageService: MessageService, roomService: RoomService, pushService: PushService);
    create(createMessageDto: CreateMessageDto, req: any): Promise<Message>;
    findAll(req: any): Promise<Message[]>;
}
