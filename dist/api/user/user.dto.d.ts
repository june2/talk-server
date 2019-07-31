export declare class CreateUserDto {
    email: string;
    password: string;
    name: string;
}
export declare class UpdateUserDto {
    readonly name: string;
    images: Array<object>;
    location: string;
    intro: string;
}
