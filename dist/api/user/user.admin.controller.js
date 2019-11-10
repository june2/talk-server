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
const mongoose = require("mongoose");
const roles_decorator_1 = require("./../../common/decorators/roles.decorator");
const roles_guard_1 = require("./../../common/guards/roles.guard");
const user_service_1 = require("./user.service");
const user_dto_1 = require("./user.dto");
let UserAdminController = class UserAdminController {
    constructor(userService) {
        this.userService = userService;
    }
    findAll(page, limit, sort, filter, req) {
        let userId = req.user.id;
        return this.userService.findAll(userId, page, limit, JSON.parse(sort));
    }
    updateLastLogin(req) {
        return __awaiter(this, void 0, void 0, function* () {
            this.userService.updateUserLastLogin();
        });
    }
    findById(id, req) {
        if (!mongoose.Types.ObjectId.isValid(id))
            throw new common_1.BadRequestException("this is not objectId");
        return this.userService.findById(id);
    }
    update(id, updateUserAdminDto, req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongoose.Types.ObjectId.isValid(id))
                throw new common_1.BadRequestException("this is not objectId");
            return this.userService.update(id, updateUserAdminDto);
        });
    }
};
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('ADMIN'),
    common_1.Get('/admin'),
    swagger_1.ApiOperation({ title: 'Get user' }),
    __param(0, common_1.Query('page')), __param(1, common_1.Query('limit')),
    __param(2, common_1.Query('sort')), __param(3, common_1.Query('filter')),
    __param(4, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserAdminController.prototype, "findAll", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('ADMIN'),
    common_1.Get('/update/admin'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserAdminController.prototype, "updateLastLogin", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('ADMIN'),
    common_1.Get('/:id/admin'),
    swagger_1.ApiOperation({ title: 'Get user by Id' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserAdminController.prototype, "findById", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('ADMIN'),
    common_1.Put('/:id/admin'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UpdateUserAdminDto, Object]),
    __metadata("design:returntype", Promise)
], UserAdminController.prototype, "update", null);
UserAdminController = __decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiUseTags('User'),
    common_1.Controller('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserAdminController);
exports.UserAdminController = UserAdminController;
//# sourceMappingURL=user.admin.controller.js.map