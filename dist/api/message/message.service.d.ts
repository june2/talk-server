import { Model } from 'mongoose';
import { CreateMessageDto } from './message.dto';
import { Message } from './message.interface';
export declare class MessageService {
    private readonly message;
    constructor(message: Model<Message>);
    create(createMessageDto: CreateMessageDto): Promise<Message>;
    findAll(): Promise<Message[]>;
    findByUserId(id: string): Promise<Message[]>;
    findById(id: string): Promise<Message>;
}
