import { Schema } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import * as crypto from 'crypto';
import { User } from './user.interface';

const genders = ['M', 'F'];
const states = ['NORMAL', 'REJECT', 'WAITING', 'BLOCK', 'LEAVE']; // 일반, 반려, 심사대기중, 재심사대기중, 블락, 탈퇴

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
  state: { type: String, enum: states, default: 'WAITING' },
  password: { type: String, required: true, minlength: 6 },
  // 성별
  gender: { type: String, enum: genders, trim: true },
  // 생년월일
  birthday: { type: Date },
  // 폰번호
  phone: { type: String },
  // 포인트
  point: { type: Number, default: 0 },
  // 마지막 로그인 시간
  lastLoginAt: { type: Date, default: new Date() },
  // 아바타
  avatar: { type: String },
  // 이미지
  images: [{
    _id: false,
    thumbnail: '',
    full: ''
  }],
  // 지역 
  location: { type: String, default: null },
  // 내소개
  intro: { type: String },
  pushToken: { type: String },
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

UserSchema.pre<User>("save", function (next) {
  const user = this;
  this.set('password', crypto.createHmac('sha256', user.password).digest('hex'));
  next();
});