import { User } from './../../api/user/user.interface';
import { NotificationService } from './../../api/notification/notification.service';
export declare class PushService {
    private readonly notificationService;
    private readonly expo;
    constructor(notificationService: NotificationService);
    send(FromName: string, user: User, lastMsg: string, roomId: string, type: string): void;
}
