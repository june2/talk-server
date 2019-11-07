"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
exports.PurchaseSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user' },
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
            delete ret._id;
        }
    }
});
exports.PurchaseSchema.plugin(mongoosePaginate);
//# sourceMappingURL=purchase.schema.js.map