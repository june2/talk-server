import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const CategorySchema = new mongoose.Schema({    
  name: { type: String },  
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

