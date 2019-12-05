import { Schema } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import * as aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import * as crypto from 'crypto';
import { User } from './user.interface';

const genders = ['M', 'F'];
const states = ['ADMIN', 'NORMAL', 'BLOCK', 'LEAVE', 'SAMPLE', 'DATALK'];

export const UserSchema = new Schema({
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  name: { type: String },
  state: { type: String, enum: states, default: 'NORMAL' },
  isActive: { type: Boolean, default: true },
  isActivePush: { type: Boolean, default: true },
  password: { type: String, required: true, minlength: 6, select: false },
  // 성별
  gender: { type: String, enum: genders, trim: true },
  // 생년월일
  birthday: { type: Date },
  // 폰번호
  phone: { type: String },
  // 포인트
  point: { type: Number, default: 50 },
  // 마지막 로그인 시간
  lastLoginAt: { type: Date, default: new Date() },
  // 이미지
  images: [String],
  // 지역 
  country: { type: String, default: null },
  // 지역 
  location: { type: String, default: null },
  // 내소개
  intro: { type: String },
  // mobile 
  pushToken: { type: String },
  PlatformOS: { type: String },
  PlatformVer: { type: String },
  blocks: { type: [Schema.Types.ObjectId] }
}, {
  versionKey: false,
  timestamps: true,
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => {
      delete ret.password
      delete ret._id
    }
  }
})

UserSchema.plugin(mongoosePaginate);
UserSchema.plugin(aggregatePaginate);

UserSchema.pre<User>("save", function (next) {
  const user = this;
  this.set('password', crypto.createHmac('sha256', user.password).digest('hex'));
  next();
});