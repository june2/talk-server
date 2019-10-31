"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_paginate_v2_1 = require("mongoose-paginate-v2");
const mongoose_2 = require("mongoose");
let UserService = class UserService {
    constructor(user, users) {
        this.user = user;
        this.users = users;
    }
    create(createUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const created = new this.user(createUserDto);
            return yield created.save();
        });
    }
    createAll(arr) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.user.insertMany(arr);
        });
    }
    findAll(id, page = 1, limit = 10, sort = { lastLoginAt: -1 }, q = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = { _id: { $ne: id } };
            if (q)
                query = Object.assign(query, q);
            let options = {
                sort: sort,
                lean: true,
                page: page,
                limit: limit
            };
            return yield this.users.paginate(query, options);
        });
    }
    findActive(id, page = 0, limit = 10, q = {}, sort = { lastLoginAt: -1 }) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = {
                $and: [
                    { _id: { $ne: id } },
                    { isActive: true },
                    { state: { $ne: 'ADMIN' } },
                    { state: { $ne: 'BLOCK' } },
                    { state: { $ne: 'LEAVE' } },
                ]
            };
            if (q)
                query = Object.assign(query, q);
            let options = {
                sort: sort,
                lean: true,
                page: page,
                limit: limit
            };
            return yield this.users.paginate(query, options);
        });
    }
    findOne(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.user.findOne(options).exec();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.user.findById(id).exec();
        });
    }
    update(id, newValue) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.user.findByIdAndUpdate(id, Object.assign({}, newValue, { lastLoginAt: new Date() }), { new: false }).exec();
        });
    }
    upload(id, images) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.user.findByIdAndUpdate(id, { images: images, lastLoginAt: new Date() }, { new: true }).exec();
        });
    }
    updateLastLogin(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.user.findByIdAndUpdate(id, { lastLoginAt: new Date() }, { new: true }).exec();
        });
    }
    updateState(id, state) {
        return __awaiter(this, void 0, void 0, function* () {
            this.user.findByIdAndUpdate(id, { state: state, isActive: false }, { new: true }).exec();
        });
    }
    updatePoint(id, point) {
        return __awaiter(this, void 0, void 0, function* () {
            this.user.findByIdAndUpdate(id, { point: point }, { new: true }).exec();
        });
    }
    registerPushToken(id, newValue) {
        return __awaiter(this, void 0, void 0, function* () {
            this.user.findByIdAndUpdate(id, newValue, { new: true }).exec();
        });
    }
    deleteSample(state) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.user.deleteMany({ state: state });
        });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('user')),
    __param(1, mongoose_1.InjectModel('user')),
    __metadata("design:paramtypes", [mongoose_2.Model, typeof (_a = typeof mongoose_paginate_v2_1.PaginateModel !== "undefined" && mongoose_paginate_v2_1.PaginateModel) === "function" ? _a : Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map