"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
exports.MessageSchema = new mongoose_1.Schema({
    room: { type: mongoose_1.Schema.Types.ObjectId, ref: 'room' },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user' },
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
            delete ret._id;
        }
    }
});
exports.MessageSchema.plugin(mongoosePaginate);
//# sourceMappingURL=message.schema.js.map