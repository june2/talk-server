export declare class CreateMessageDto {
    constructor(room: string, user: string, text: string, system?: boolean);
    room: string;
    user: string;
    text: string;
    image: string;
    video: string;
    system: boolean;
    quickReplies: object;
    to: string;
}
