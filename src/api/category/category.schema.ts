import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const CategorySchema = new mongoose.Schema({
  _id: { type: String, unique: true, required: true, index: true, alias: 'id' },
  parent_id: { type: String, alias: 'parentId', ref: 'category' },
  name: { type: Object },
  tags: { type: Object }
}, {
    _id: false,
    versionKey: false,
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret.parent_id
        delete ret._id
      }
    }
    // timestamps: true,
  })

