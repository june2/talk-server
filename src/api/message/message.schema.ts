import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const MessageSchema = new mongoose.Schema({
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
  })

