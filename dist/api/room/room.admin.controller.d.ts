import { RoomService } from './room.service';
import { Room } from './room.interface';
import { MessageService } from '../message/message.service';
import { Message } from '../message/message.interface';
import { NotificationService } from '../notification/notification.service';
import { UserService } from '../user/user.service';
import { PushService } from '../../common/push/push.service';
export declare class RoomAdminController {
    private readonly roomService;
    private readonly messageService;
    private readonly pushService;
    private readonly notificationService;
    private readonly userService;
    constructor(roomService: RoomService, messageService: MessageService, pushService: PushService, notificationService: NotificationService, userService: UserService);
    findAll(offset: number, limit: number, sort: any, filter: any, req: any): Promise<Room[]>;
    findById(id: string, offset: number, limit: number, req: any): Promise<Room>;
    findMessagesById(id: string, offset: number, limit: number, req: any): Promise<Message[]>;
}
