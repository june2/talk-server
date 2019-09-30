export declare class CreateMessageDto {
    constructor(room: string, user: string, text: string);
    room: string;
    user: string;
    text: string;
    image: string;
    video: string;
    system: boolean;
    quickReplies: object;
}
