export declare class CreateRoomDto {
    constructor(users: Array<string>, lastMsg: string);
    users: Array<string>;
    lastMsg: string;
}
export declare class ReqRoomDto {
    userId: string;
    lastMsg: string;
}
