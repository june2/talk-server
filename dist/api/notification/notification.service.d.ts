import { Model } from 'mongoose';
import { CreateNotificationDto } from './notification.dto';
import { Notification } from './notification.interface';
export declare class NotificationService {
    private readonly notification;
    constructor(notification: Model<Notification>);
    create(createNotificationDto: CreateNotificationDto): Promise<Notification>;
    count(id: string): Promise<Number>;
    update(id: string): Promise<void>;
    deleteByUserAndRoom(roomId: string, userId: string): Promise<void>;
}
