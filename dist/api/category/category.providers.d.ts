import { Connection } from 'mongoose';
export declare const categoryProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("mongoose").Model<import("mongoose").Document, {}>;
    inject: string[];
}[];
