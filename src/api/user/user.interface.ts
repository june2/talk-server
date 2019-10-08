import { Document } from 'mongoose';
import { BooleanLiteralTypeAnnotation } from '@babel/types';

export interface User extends Document {
  readonly email: string;
  readonly password: string;
  readonly name: string;
  state: string;
  isActive: boolean;
  isActivePush: boolean;
  pushToken: string;
  images: Array<object>;
}
