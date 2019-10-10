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
const room_dto_1 = require("./room.dto");
const room_service_1 = require("./room.service");
const message_service_1 = require("../message/message.service");
const message_dto_1 = require("../message/message.dto");
const notification_service_1 = require("../notification/notification.service");
const user_service_1 = require("./../user/user.service");
const push_service_1 = require("../../common/push/push.service");
let RoomController = class RoomController {
    constructor(roomService, messageService, pushService, notificationService, userService) {
        this.roomService = roomService;
        this.messageService = messageService;
        this.pushService = pushService;
        this.notificationService = notificationService;
        this.userService = userService;
    }
    create(reqRoomDto, req) {
        return __awaiter(this, void 0, void 0, function* () {
            let room = yield this.roomService.findByUsers(req.user.id, reqRoomDto.userId);
            if (!room) {
                if (req.user.point < 50)
                    throw new common_1.UnauthorizedException();
                room = yield this.roomService.create(new room_dto_1.CreateRoomDto([req.user.id, reqRoomDto.userId], reqRoomDto.lastMsg));
                this.userService.updatePoint(req.user.id, (req.user.point - 50));
            }
            else {
                this.roomService.updatLastMsgByRoomId(room.id, reqRoomDto.lastMsg);
            }
            this.messageService.create(new message_dto_1.CreateMessageDto(room.id, req.user.id, reqRoomDto.lastMsg));
            let to = yield this.userService.findById(reqRoomDto.userId);
            if (null != to.pushToken && to.isActivePush) {
                let meg = `${req.user.name}님이 메시지를 보냈습니다.`;
                this.pushService.send(req.user.name, to, meg, room.id, 'room');
            }
            return room;
        });
    }
    findAll(offset, limit, req) {
        return __awaiter(this, void 0, void 0, function* () {
            let userId = req.user.id;
            return this.roomService.findByUserId(userId, offset, limit);
        });
    }
    findById(id, offset, limit, req) {
        return __awaiter(this, void 0, void 0, function* () {
            let room = yield this.roomService.checkUserInRoom(id, req.user.id);
            if (null === room)
                throw new common_1.UnauthorizedException();
            this.notificationService.deleteByUserAndRoom(room.id, req.user.id);
            return this.roomService.findMessageByRoomId(id, offset, limit);
        });
    }
    deleteById(id, req) {
        return __awaiter(this, void 0, void 0, function* () {
            let room = yield this.roomService.checkUserInRoom(id, req.user.id);
            if (null === room)
                throw new common_1.UnauthorizedException();
            let arr = room.lefts;
            arr.push(req.user.id);
            this.messageService.create(new message_dto_1.CreateMessageDto(room.id, req.user.id, `${req.user.name}님이 방을 나갔습니다.`, true));
            return this.roomService.updatLeftByRoomId(id, arr);
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
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Delete('/:id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "deleteById", null);
RoomController = __decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiUseTags('Room'),
    common_1.Controller('rooms'),
    __metadata("design:paramtypes", [room_service_1.RoomService,
        message_service_1.MessageService,
        push_service_1.PushService,
        notification_service_1.NotificationService,
        user_service_1.UserService])
], RoomController);
exports.RoomController = RoomController;
//# sourceMappingURL=room.controller.js.map