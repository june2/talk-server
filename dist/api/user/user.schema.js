"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const crypto = require("crypto");
const genders = ['M', 'F'];
const states = ['ADMIN', 'NORMAL', 'BLOCK', 'LEAVE', 'SAMPLE', 'DATALK'];
exports.UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        match: /^\S+@\S+\.\S+$/,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    name: { type: String },
    state: { type: String, enum: states, default: 'NORMAL' },
    isActive: { type: Boolean, default: true },
    isActivePush: { type: Boolean, default: true },
    password: { type: String, required: true, minlength: 6, select: false },
    gender: { type: String, enum: genders, trim: true },
    birthday: { type: Date },
    phone: { type: String },
    point: { type: Number, default: 50 },
    lastLoginAt: { type: Date, default: new Date() },
    images: [String],
    country: { type: String, default: null },
    location: { type: String, default: null },
    intro: { type: String },
    pushToken: { type: String },
    PlatformOS: { type: String },
    PlatformVer: { type: String },
    blocks: [mongoose_1.Schema.Types.ObjectId]
}, {
    versionKey: false,
    timestamps: true,
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true,
        transform: (obj, ret) => {
            delete ret.password;
            delete ret._id;
        }
    }
});
exports.UserSchema.plugin(mongoosePaginate);
exports.UserSchema.plugin(aggregatePaginate);
exports.UserSchema.pre("save", function (next) {
    const user = this;
    this.set('password', crypto.createHmac('sha256', user.password).digest('hex'));
    next();
});
//# sourceMappingURL=user.schema.js.map