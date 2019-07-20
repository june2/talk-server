import { Schema } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export const MessageSchema = new Schema({
  room: { type: Schema.Types.ObjectId, ref: 'room' },
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  text: { type: String },
  image: { type: String },
  video: { type: String },
  system: { type: Boolean, default: false },
  quickReplies: { type: Object },
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
  });

MessageSchema.plugin(mongoosePaginate);
