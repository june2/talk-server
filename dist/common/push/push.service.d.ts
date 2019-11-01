import { User } from './../../api/user/user.interface';
import { NotificationService } from './../../api/notification/notification.service';
export declare class PushService {
    private readonly notificationService;
    private readonly fcm;
    constructor(notificationService: NotificationService);
    send(from: User, to: User, body: string, lastMsg: string, roomId: string, type: string): void;
}
