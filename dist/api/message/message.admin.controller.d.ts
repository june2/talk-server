import { CreateMessageDto } from './message.dto';
import { MessageService } from './message.service';
import { Message } from './message.interface';
import { RoomService } from '../room/room.service';
import { PushService } from '../../common/push/push.service';
import { UserService } from '../user/user.service';
export declare class MessageAdminController {
    private readonly messageService;
    private readonly roomService;
    private readonly userService;
    private readonly pushService;
    constructor(messageService: MessageService, roomService: RoomService, userService: UserService, pushService: PushService);
    create(createMessageDto: CreateMessageDto, req: any): Promise<Message>;
}
