import { Document } from 'mongoose';

export interface Room extends Document {
  readonly id: string;
  readonly users: Array<string>;
  readonly lefts: Array<string>;
  readonly lastMsg: string;
}
