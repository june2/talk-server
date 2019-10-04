export declare class CreateUserDto {
    email: string;
    password: string;
    name: string;
    images: Array<string>;
    gender: string;
    birthday: Date;
    location: string;
}
export declare class CreateUserSampleDto {
    constructor(email: any, password: any, name: any, images: any, gender: any, birthday: any, location: any, intro: any, states?: string);
    email: string;
    password: string;
    name: string;
    images: Array<string>;
    gender: string;
    birthday: Date;
    location: string;
    intro: string;
    states: string;
}
export declare class UpdateUserDto {
    readonly name: string;
    images: Array<string>;
    location: string;
    gender: string;
    birthday: Date;
    intro: string;
}
export declare class UpdateUserPushTokenDto {
    PlatformOS: string;
    PlatformVer: string;
    pushToken: string;
}
