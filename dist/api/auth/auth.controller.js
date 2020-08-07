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
const crypto = require("crypto");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth.service");
const user_service_1 = require("./../user/user.service");
const user_dto_1 = require("./../user/user.dto");
const auth_dto_1 = require("./auth.dto");
const notification_service_1 = require("../notification/notification.service");
let AuthController = class AuthController {
    constructor(authService, userService, notificationService) {
        this.authService = authService;
        this.userService = userService;
        this.notificationService = notificationService;
    }
    register(createUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authService.register(createUserDto);
        });
    }
    login(authLoginDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findOne({
                email: authLoginDto.email,
                password: crypto.createHmac('sha256', authLoginDto.password).digest('hex')
            });
            if (!user) {
                throw new common_1.UnauthorizedException('Wrong login combination!');
            }
            return yield this.authService.createToken(user);
        });
    }
    getProfile(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = req.user;
            return {
                id: user.id,
                state: user.state,
                point: user.point,
                lastLoginAt: user.lastLoginAt,
                location: user.location,
                email: user.email,
                images: user.images,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                intro: user.intro,
                name: user.name,
                gender: user.gender,
                birthday: user.birthday,
                isActivePush: user.isActivePush,
                rewardAt: user.rewardAt,
                tabBadgeCount: yield this.notificationService.count(req.user.id)
            };
        });
    }
};
__decorate([
    common_1.Post('register'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    common_1.Post('/login'),
    swagger_1.ApiResponse({ status: 201, description: 'Successful Login' }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad Request' }),
    swagger_1.ApiResponse({ status: 401, description: 'Unauthorized' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthLoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Get('me'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
AuthController = __decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiUseTags('Auth'),
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService,
        notification_service_1.NotificationService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map