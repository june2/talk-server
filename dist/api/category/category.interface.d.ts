import { Document } from 'mongoose';
export interface Category extends Document {
    readonly parentId: string;
    readonly name: object;
    readonly tags: object;
}
