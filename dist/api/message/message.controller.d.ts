import { CreateMessageDto } from './message.dto';
import { MessageService } from './message.service';
import { Message } from './message.interface';
import { RoomService } from './../room/room.service';
import { UserService } from './../user/user.service';
import { NotificationService } from './../notification/notification.service';
import { PushService } from '../../common/push/push.service';
import { SfService } from '../../common/stepfunction/sf.service';
export declare class MessageController {
    private readonly messageService;
    private readonly roomService;
    private readonly userService;
    private readonly pushService;
    private readonly sfService;
    private readonly notificationService;
    constructor(messageService: MessageService, roomService: RoomService, userService: UserService, pushService: PushService, sfService: SfService, notificationService: NotificationService);
    create(createMessageDto: CreateMessageDto, req: any): Promise<Message>;
    findAll(req: any): Promise<Message[]>;
}
