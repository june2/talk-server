import { CreateMessageDto } from './message.dto';
import { MessageService } from './message.service';
import { Message } from './message.interface';
export declare class MessageController {
    private readonly MessageService;
    constructor(MessageService: MessageService);
    create(createMessageDto: CreateMessageDto, req: any): Promise<Message>;
    findAll(req: any): Promise<Message[]>;
}
