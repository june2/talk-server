import { CreateMessageDto } from './message.dto';
import { MessageService } from './message.service';
import { Message } from './message.interface';
import { RoomService } from '../room/room.service';
import { PushService } from '../../common/push/push.service';
import { UserService } from '../user/user.service';
import { NotificationService } from './../notification/notification.service';
export declare class MessageAdminController {
    private readonly messageService;
    private readonly roomService;
    private readonly userService;
    private readonly pushService;
    private readonly notificationService;
    constructor(messageService: MessageService, roomService: RoomService, userService: UserService, pushService: PushService, notificationService: NotificationService);
    create(createMessageDto: CreateMessageDto, req: any): Promise<Message>;
}
