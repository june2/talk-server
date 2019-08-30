"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
exports.RoomSchema = new mongoose_1.Schema({
    users: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'user' }],
    lefts: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'user' }],
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
            delete ret._id;
        }
    }
});
exports.RoomSchema.plugin(mongoosePaginate);
//# sourceMappingURL=room.schema.js.map