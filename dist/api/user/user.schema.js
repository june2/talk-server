"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const crypto = require("crypto");
const genders = ['M', 'F'];
const states = ['NORMAL', 'REJECT', 'WAITING', 'BLOCK', 'LEAVE'];
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
    state: { type: String, enum: states, default: 'WAITING' },
    password: { type: String, required: true, minlength: 6 },
    gender: { type: String, enum: genders, trim: true },
    birthday: { type: Date },
    phone: { type: String },
    point: { type: Number, default: 0 },
    lastLoginAt: { type: Date, default: new Date() },
    avatar: { type: String },
    images: [{
            _id: false,
            thumbnail: '',
            full: ''
        }],
    location: { type: String, default: null },
    intro: { type: String },
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
exports.UserSchema.pre("save", function (next) {
    const user = this;
    this.set('password', crypto.createHmac('sha256', user.password).digest('hex'));
    next();
});
//# sourceMappingURL=user.schema.js.map