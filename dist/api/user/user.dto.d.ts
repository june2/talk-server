export declare class CreateUserDto {
    email: string;
    password: string;
    name: string;
    images: Array<string>;
    gender: string;
    birthday: Date;
    location: string;
    locale: string;
    region: string;
    platformOS: string;
    platformVer: string;
    pushToken: string;
}
export declare class CreateUserSampleDto {
    constructor(email: any, password: any, name: any, images: any, gender: any, birthday: any, country: any, location: any, intro: any, state?: string);
    email: string;
    password: string;
    name: string;
    images: Array<string>;
    gender: string;
    birthday: Date;
    country: string;
    location: string;
    intro: string;
    state: string;
}
export declare class UpdateUserDto {
    readonly name: string;
    images: Array<string>;
    location: string;
    gender: string;
    birthday: Date;
    intro: string;
    isActivePush: boolean;
}
export declare class UpdateUserPushTokenDto {
    platformOS: string;
    platformVer: string;
    pushToken: string;
}
export declare class AddBlockUserDto {
    blockId: string;
}
export declare class UpdateUserAdminDto {
    readonly state: string;
    readonly name: string;
    images: Array<string>;
    location: string;
    gender: string;
    birthday: Date;
    intro: string;
    isActivePush: boolean;
    point: number;
}
