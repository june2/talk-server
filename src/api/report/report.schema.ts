import { Schema } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export const ReportSchema = new Schema({
  to: { type: Schema.Types.ObjectId, ref: 'user' },
  from: { type: Schema.Types.ObjectId, ref: 'user' },
  msg: { type: String },
  option: { type: Number },
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

ReportSchema.plugin(mongoosePaginate);