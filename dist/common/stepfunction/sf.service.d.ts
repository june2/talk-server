import { User } from './../../api/user/user.interface';
export declare class SfService {
    private readonly sf;
    constructor();
    excute(user: User, to: User, text: string, room: string): void;
}
