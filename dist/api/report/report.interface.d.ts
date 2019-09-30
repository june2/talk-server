import { Document } from 'mongoose';
export interface Report extends Document {
    readonly id: string;
    readonly to: string;
    readonly from: string;
    readonly msg: string;
    readonly option: number;
}
