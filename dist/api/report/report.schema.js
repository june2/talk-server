"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
exports.ReportSchema = new mongoose_1.Schema({
    to: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user' },
    from: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user' },
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
            delete ret._id;
        }
    }
});
exports.ReportSchema.plugin(mongoosePaginate);
//# sourceMappingURL=report.schema.js.map