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
const room_schema_1 = require("./room.schema");
const room_controller_1 = require("./room.controller");
const room_admin_controller_1 = require("./room.admin.controller");
const room_service_1 = require("./room.service");
const message_schema_1 = require("./../message/message.schema");
const message_service_1 = require("./../message/message.service");
const user_module_1 = require("./../user/user.module");
const user_service_1 = require("./../user/user.service");
const notification_service_1 = require("../notification/notification.service");
const push_module_1 = require("../../common/push/push.module");
const sf_module_1 = require("../../common/stepfunction/sf.module");
let RoomModule = class RoomModule {
};
RoomModule = __decorate([
    common_1.Module({
        imports: [
            user_module_1.UserModule,
            push_module_1.PushModule,
            sf_module_1.SfModule,
            mongoose_1.MongooseModule.forFeature([
                { name: 'room', schema: room_schema_1.RoomSchema },
                { name: 'message', schema: message_schema_1.MessageSchema }
            ]),
        ],
        controllers: [room_admin_controller_1.RoomAdminController, room_controller_1.RoomController],
        providers: [room_service_1.RoomService, message_service_1.MessageService, notification_service_1.NotificationService, user_service_1.UserService],
    })
], RoomModule);
exports.RoomModule = RoomModule;
//# sourceMappingURL=room.module.js.map