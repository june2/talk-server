import { Document } from 'mongoose';
import { User } from '../user/user.interface';
export interface Purchase extends Document {
    readonly id: string;
    readonly user: User;
    readonly type: string;
    isRead: boolean;
}
