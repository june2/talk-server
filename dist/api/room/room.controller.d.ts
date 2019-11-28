import { ReqRoomDto } from './room.dto';
import { RoomService } from './room.service';
import { Room } from './room.interface';
import { MessageService } from '../message/message.service';
import { Message } from '../message/message.interface';
import { NotificationService } from '../notification/notification.service';
import { UserService } from './../user/user.service';
import { PushService } from '../../common/push/push.service';
import { SfService } from '../../common/stepfunction/sf.service';
export declare class RoomController {
    private readonly roomService;
    private readonly messageService;
    private readonly pushService;
    private readonly notificationService;
    private readonly sfService;
    private readonly userService;
    constructor(roomService: RoomService, messageService: MessageService, pushService: PushService, notificationService: NotificationService, sfService: SfService, userService: UserService);
    create(reqRoomDto: ReqRoomDto, req: any): Promise<Room>;
    findAll(page: number, limit: number, req: any): Promise<Room[]>;
    findById(id: string, offset: number, limit: number, req: any): Promise<Message[]>;
    deleteById(id: string, req: any): Promise<Room>;
}
