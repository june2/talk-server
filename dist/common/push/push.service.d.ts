import { NotificationService } from './../../api/notification/notification.service';
export declare class PushService {
    private readonly notificationService;
    private readonly expo;
    constructor(notificationService: NotificationService);
    send(userId: string, lastMsg: string, roomId: string): void;
}
