import { Schema } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export const PurchaseSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  productId: { type: String },
  transactionId: { type: String },
  result: { type: Object }
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

PurchaseSchema.plugin(mongoosePaginate);