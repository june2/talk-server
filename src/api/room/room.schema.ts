import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const RoomSchema = new mongoose.Schema({
  users: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  lastMsg: { type: String }
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

