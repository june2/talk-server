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
const multer_config_1 = require("../../common/multer/multer.config");
const platform_express_1 = require("@nestjs/platform-express");
const passport_1 = require("@nestjs/passport");
const mongoose = require("mongoose");
const moment = require("moment");
const user_service_1 = require("./user.service");
const user_dto_1 = require("./user.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    findAll(page, limit, req) {
        let userId = req.user.id;
        this.userService.updateLastLogin(userId);
        return this.userService.findAll(userId, page, limit);
    }
    findById(id, req) {
        if (id === 'me')
            return req.user;
        else {
            if (!mongoose.Types.ObjectId.isValid(id))
                throw new common_1.BadRequestException("this is not objectId");
            return this.userService.findById(id);
        }
    }
    create(createUserDto) {
        return this.userService.create(createUserDto);
    }
    update(id, updateUserDto, req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.user)
                throw new common_1.UnauthorizedException();
            return this.userService.update(req.user.id, updateUserDto);
        });
    }
    uploadFile(file, req) {
        let images = [...req.user.images, file.Location];
        return this.userService.upload(req.user.id, images);
    }
    updateLastLogin(id, req) {
        this.userService.updateLastLogin(req.user.id);
        let today = moment(new Date()).format('YYYY-MM-DD');
        let isAfter = moment(req.user.lastLoginAt).isBefore(today);
        let point = req.user.point;
        if (isAfter) {
            this.userService.updatePoint(req.user.id, (point + 50));
            return { reward: true, point: point + 50 };
        }
        else {
            return { reward: false, point: point };
        }
    }
    leave(id, req) {
        this.userService.updateState(req.user.id, 'LEAVE');
    }
    registerPushToken(id, req, updateUserPushTokenDto) {
        this.userService.registerPushToken(req.user.id, updateUserPushTokenDto);
    }
};
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Get(),
    swagger_1.ApiOperation({ title: 'Get user' }),
    __param(0, common_1.Query('page')), __param(1, common_1.Query('limit')), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Get('/:id'),
    swagger_1.ApiOperation({ title: 'Get user by Id' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findById", null);
__decorate([
    swagger_1.ApiOperation({ title: 'Create user' }),
    swagger_1.ApiResponse({ status: 201, description: 'The record has been successfully created.' }),
    swagger_1.ApiResponse({ status: 403, description: 'Forbidden.' }),
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Put('/:id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    swagger_1.ApiImplicitFile({ name: 'file', required: true, description: 'files to upload' }),
    swagger_1.ApiImplicitParam({ name: 'id', type: 'string', required: true, description: 'user id' }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Post('/:id/upload'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('upload', multer_config_1.multerOptions())),
    __param(0, common_1.UploadedFile()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "uploadFile", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Put('/:id/updateLastLogin'),
    __param(0, common_1.Param('id')), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Object)
], UserController.prototype, "updateLastLogin", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Put('/:id/leave'),
    __param(0, common_1.Param('id')), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "leave", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Put('/:id/registerPushToken'),
    __param(0, common_1.Param('id')), __param(1, common_1.Request()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, user_dto_1.UpdateUserPushTokenDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "registerPushToken", null);
UserController = __decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiUseTags('User'),
    common_1.Controller('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map