import { Schema } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import * as aggregatePaginate from 'mongoose-aggregate-paginate-v2';

export const RoomSchema = new Schema({
  users: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  lefts: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  lastMsg: { type: String },
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

RoomSchema.plugin(mongoosePaginate);
RoomSchema.plugin(aggregatePaginate);