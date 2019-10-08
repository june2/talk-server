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
const message_dto_1 = require("./message.dto");
const message_service_1 = require("./message.service");
const room_service_1 = require("./../room/room.service");
const push_service_1 = require("../../common/push/push.service");
const user_service_1 = require("./../user/user.service");
let MessageController = class MessageController {
    constructor(messageService, roomService, userService, pushService) {
        this.messageService = messageService;
        this.roomService = roomService;
        this.userService = userService;
        this.pushService = pushService;
    }
    create(createMessageDto, req) {
        return __awaiter(this, void 0, void 0, function* () {
            createMessageDto.user = req.user.id;
            this.roomService.updatLastMsgByRoomId(createMessageDto.room, createMessageDto.text);
            let to = yield this.userService.findById(createMessageDto.to);
            if (null != to && null != to.pushToken && to.isActivePush) {
                this.pushService.send(req.user.name, createMessageDto.to, to.pushToken, createMessageDto.text, createMessageDto.room);
            }
            return this.messageService.create(createMessageDto);
        });
    }
    findAll(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let userId = req.user.id;
            return this.messageService.findByUserId(userId);
        });
    }
};
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Post(),
    swagger_1.ApiOperation({ title: 'Send message' }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_dto_1.CreateMessageDto, Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "create", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Get(),
    swagger_1.ApiOperation({ title: 'Get messages by userId' }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "findAll", null);
MessageController = __decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiUseTags('Message'),
    common_1.Controller('messages'),
    __metadata("design:paramtypes", [message_service_1.MessageService,
        room_service_1.RoomService,
        user_service_1.UserService,
        push_service_1.PushService])
], MessageController);
exports.MessageController = MessageController;
//# sourceMappingURL=message.controller.js.map