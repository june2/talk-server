"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_module_1 = require("./common/config/config.module");
const config_service_1 = require("./common/config/config.service");
const push_module_1 = require("./common/push/push.module");
const auth_module_1 = require("./api/auth/auth.module");
const user_module_1 = require("./api/user/user.module");
const room_module_1 = require("./api/room/room.module");
const message_module_1 = require("./api/message/message.module");
const report_module_1 = require("./api/report/report.module");
const notification_module_1 = require("./api/notification/notification.module");
const purchase_module_1 = require("./api/purchase/purchase.module");
let ApplicationModule = class ApplicationModule {
};
ApplicationModule = __decorate([
    common_1.Module({
        imports: [
            config_module_1.ConfigModule,
            push_module_1.PushModule,
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_module_1.ConfigModule],
                useFactory: (config) => __awaiter(this, void 0, void 0, function* () {
                    return ({
                        uri: config.uri,
                        useNewUrlParser: true,
                        useCreateIndex: true,
                        useFindAndModify: false
                    });
                }),
                inject: [config_service_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            room_module_1.RoomModule,
            message_module_1.MessageModule,
            report_module_1.ReportModule,
            notification_module_1.NotificationModule,
            purchase_module_1.PurchaseModule,
        ]
    })
], ApplicationModule);
exports.ApplicationModule = ApplicationModule;
//# sourceMappingURL=app.module.js.map