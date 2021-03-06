import { User } from './../../api/user/user.interface';
export declare class PushService {
    private readonly fcm;
    constructor();
    send(from: User, to: User, badge: number, body: string, lastMsg: string, roomId: string, type: string, image?: string): void;
}
