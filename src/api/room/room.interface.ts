import { Document } from 'mongoose';

export interface Room extends Document {
  readonly id: string;
  readonly lastMsg: string;
  readonly lastTime: string;
}
