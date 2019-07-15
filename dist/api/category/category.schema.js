"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.CategorySchema = new mongoose.Schema({
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
            delete ret.parent_id;
            delete ret._id;
        }
    }
});
//# sourceMappingURL=category.schema.js.map