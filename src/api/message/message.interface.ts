import { Document } from 'mongoose';

export interface Message extends Document {
  readonly id: string;
  readonly text: string;
  readonly image: string;
  readonly video: string;
  readonly system: boolean;
}
