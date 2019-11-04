"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
exports.NotificationSchema = new mongoose_1.Schema({
    room: { type: mongoose_1.Schema.Types.ObjectId, ref: 'room' },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user' },
    type: { type: String },
    isRead: { type: Boolean, default: false }
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
exports.NotificationSchema.plugin(mongoosePaginate);
//# sourceMappingURL=notification.schema.js.map