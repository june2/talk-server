import { Schema } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export const NotificationSchema = new Schema({
  room: { type: Schema.Types.ObjectId, ref: 'room' },
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  type: { type: String },
  isRead: { type: Boolean }
}, {
  versionKey: false,
  timestamps: true,
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => {
      delete ret._id
    }
  }
})

NotificationSchema.plugin(mongoosePaginate);