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
const auth_service_1 = require("./auth.service");
const user_service_1 = require("../user/user.service");
const auth_dto_1 = require("./auth.dto");
let AuthAdminController = class AuthAdminController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    login(authLoginDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findOne({
                email: authLoginDto.email,
                password: crypto.createHmac('sha256', authLoginDto.password).digest('hex')
            });
            if (!user || user.state !== 'ADMIN') {
                throw new common_1.UnauthorizedException('Wrong login combination!');
            }
            return yield this.authService.createToken(user);
        });
    }
};
__decorate([
    common_1.Post('/login/admin'),
    swagger_1.ApiResponse({ status: 201, description: 'Successful Login' }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad Request' }),
    swagger_1.ApiResponse({ status: 401, description: 'Unauthorized' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthLoginDto]),
    __metadata("design:returntype", Promise)
], AuthAdminController.prototype, "login", null);
AuthAdminController = __decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiUseTags('Auth'),
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService])
], AuthAdminController);
exports.AuthAdminController = AuthAdminController;
//# sourceMappingURL=auth.admin.controller.js.map