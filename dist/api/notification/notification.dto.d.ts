export declare class CreateNotificationDto {
    constructor(room: string, user: string, type: string, isRead?: boolean);
    user: string;
    room: string;
    type: string;
    isRead: boolean;
}
