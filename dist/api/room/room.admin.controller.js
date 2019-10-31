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
const room_service_1 = require("./room.service");
const roles_decorator_1 = require("./../../common/decorators/roles.decorator");
const roles_guard_1 = require("./../../common/guards/roles.guard");
let RoomAdminController = class RoomAdminController {
    constructor(roomService) {
        this.roomService = roomService;
    }
    findAll(page, limit, sort, filter, req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.roomService.findAll(page, limit, sort);
        });
    }
    findById(id, req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.roomService.findById(id);
        });
    }
    findMessagesById(id, page, limit, req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.roomService.findMessageByRoomId(id, page, limit);
        });
    }
};
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('ADMIN'),
    common_1.Get('/admin'),
    swagger_1.ApiOperation({ title: 'Get rooms by userId' }),
    __param(0, common_1.Query('page')), __param(1, common_1.Query('limit')),
    __param(2, common_1.Query('sort')), __param(3, common_1.Query('filter')),
    __param(4, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], RoomAdminController.prototype, "findAll", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('ADMIN'),
    common_1.Get('/:id/admin'),
    __param(0, common_1.Param('id')), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoomAdminController.prototype, "findById", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('ADMIN'),
    common_1.Get('/:id/messages/admin'),
    __param(0, common_1.Param('id')), __param(1, common_1.Query('page')), __param(2, common_1.Query('limit')), __param(3, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], RoomAdminController.prototype, "findMessagesById", null);
RoomAdminController = __decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiUseTags('Room'),
    common_1.Controller('rooms'),
    __metadata("design:paramtypes", [room_service_1.RoomService])
], RoomAdminController);
exports.RoomAdminController = RoomAdminController;
//# sourceMappingURL=room.admin.controller.js.map