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
var _a, _b;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_paginate_v2_1 = require("mongoose-paginate-v2");
const mongoose_2 = require("mongoose");
let RoomService = class RoomService {
    constructor(room, rooms, message) {
        this.room = room;
        this.rooms = rooms;
        this.message = message;
    }
    create(createRoomDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const created = new this.room(createRoomDto);
            return yield created.save();
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.rooms.find().populate('users').exec();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.room.findById(id).exec();
        });
    }
    findByUserId(id, offset = 0, limit = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = { users: { $in: [id] } };
            let options = {
                sort: { createdAt: -1 },
                populate: {
                    path: 'users',
                    match: { _id: { $ne: id } }
                },
                lean: true,
                offset: offset,
                limit: limit
            };
            return yield this.rooms.paginate(query, options);
        });
    }
    findMessageByRoomId(id, offset = 0, limit = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = { room: id };
            let options = {
                sort: { createdAt: -1 },
                populate: 'user',
                lean: true,
                offset: offset,
                limit: limit
            };
            return yield this.message.paginate(query, options);
        });
    }
    checkUserInRoom(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = false;
            let room = yield this.rooms.findById(id).exec();
            if (room) {
                for (let i = 0; i < room.users.length; i++) {
                    if (room.users[i] == userId) {
                        res = true;
                        break;
                    }
                }
            }
            return res;
        });
    }
};
RoomService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('room')),
    __param(1, mongoose_1.InjectModel('room')),
    __param(2, mongoose_1.InjectModel('message')),
    __metadata("design:paramtypes", [mongoose_2.Model, typeof (_a = typeof mongoose_paginate_v2_1.PaginateModel !== "undefined" && mongoose_paginate_v2_1.PaginateModel) === "function" ? _a : Object, typeof (_b = typeof mongoose_paginate_v2_1.PaginateModel !== "undefined" && mongoose_paginate_v2_1.PaginateModel) === "function" ? _b : Object])
], RoomService);
exports.RoomService = RoomService;
//# sourceMappingURL=room.service.js.map