"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const message_schema_1 = require("./message.schema");
const message_controller_1 = require("./message.controller");
const message_admin_controller_1 = require("./message.admin.controller");
const message_service_1 = require("./message.service");
const room_service_1 = require("./../room/room.service");
const room_schema_1 = require("./../room/room.schema");
const notification_service_1 = require("./../notification/notification.service");
const user_module_1 = require("./../user/user.module");
const push_module_1 = require("../../common/push/push.module");
let MessageModule = class MessageModule {
};
MessageModule = __decorate([
    common_1.Module({
        imports: [
            user_module_1.UserModule,
            push_module_1.PushModule,
            mongoose_1.MongooseModule.forFeature([
                { name: 'message', schema: message_schema_1.MessageSchema },
                { name: 'room', schema: room_schema_1.RoomSchema }
            ]),
        ],
        controllers: [message_admin_controller_1.MessageAdminController, message_controller_1.MessageController],
        providers: [message_service_1.MessageService, room_service_1.RoomService, notification_service_1.NotificationService],
    })
], MessageModule);
exports.MessageModule = MessageModule;
//# sourceMappingURL=message.module.js.map