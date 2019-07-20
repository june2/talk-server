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
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const { ObjectId } = require('mongodb');
const room_dto_1 = require("./room.dto");
const room_service_1 = require("./room.service");
let RoomController = class RoomController {
    constructor(RoomService) {
        this.RoomService = RoomService;
    }
    create(reqRoomDto, req) {
        return __awaiter(this, void 0, void 0, function* () {
            let createRoomDto = new room_dto_1.CreateRoomDto();
            createRoomDto.lastMsg = reqRoomDto.lastMsg;
            createRoomDto.users.push(req.user.id);
            createRoomDto.users.push(reqRoomDto.userId);
            this.RoomService.create(createRoomDto);
        });
    }
    findAll(offset, limit, req) {
        return __awaiter(this, void 0, void 0, function* () {
            let userId = req.user.id;
            return this.RoomService.findByUserId(userId, offset, limit);
        });
    }
    findById(id, offset, limit, req) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.RoomService.checkUserInRoom(id, req.user.id);
            if (!res)
                throw new common_1.UnauthorizedException();
            return this.RoomService.findMessageByRoomId(id, offset, limit);
        });
    }
};
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Post(),
    swagger_1.ApiOperation({ title: 'Create room' }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [room_dto_1.ReqRoomDto, Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "create", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Get(),
    swagger_1.ApiOperation({ title: 'Get rooms by userId' }),
    __param(0, common_1.Query('offset')), __param(1, common_1.Query('limit')), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "findAll", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Get('/:id/messages'),
    __param(0, common_1.Param('id')), __param(1, common_1.Query('offset')), __param(2, common_1.Query('limit')), __param(3, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "findById", null);
RoomController = __decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiUseTags('Room'),
    common_1.Controller('rooms'),
    __metadata("design:paramtypes", [room_service_1.RoomService])
], RoomController);
exports.RoomController = RoomController;
//# sourceMappingURL=room.controller.js.map