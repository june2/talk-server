"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const auth_controller_1 = require("./auth.controller");
const auth_admin_controller_1 = require("./auth.admin.controller");
const auth_service_1 = require("./auth.service");
const user_module_1 = require("./../user/user.module");
const jwt_strategy_1 = require("./jwt.strategy");
const constants_1 = require("./constants");
const notification_module_1 = require("../notification/notification.module");
const notification_service_1 = require("../notification/notification.service");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            user_module_1.UserModule,
            notification_module_1.NotificationModule,
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register({
                secret: constants_1.jwtConstants.secret,
                signOptions: {
                    expiresIn: constants_1.jwtConstants.expiresIn,
                },
            }),
        ],
        controllers: [auth_admin_controller_1.AuthAdminController, auth_controller_1.AuthController,],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, notification_service_1.NotificationService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map