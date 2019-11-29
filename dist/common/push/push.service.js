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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const FCM = require("fcm-node");
const config_service_1 = require("./../config/config.service");
let PushService = class PushService {
    constructor() {
        const config = new config_service_1.ConfigService();
        this.fcm = new FCM(config.fcmKey);
    }
    send(from, to, body, lastMsg, roomId, type, image = null) {
        let message = {
            to: to.pushToken,
            notification: {
                title: from.name,
                body: body,
                badge: 3,
                sound: 'default'
            },
            data: {
                type: type,
                roomId: roomId,
                userId: from.id,
                userName: from.name,
                userImage: (from.images.length > 0) ? from.images[0] : '',
                msg: lastMsg,
                image: image
            },
        };
        this.fcm.send(message, function (err, response) {
            if (err) {
                console.error(`push: ${err}`);
            }
            else {
                console.log(response);
            }
        });
    }
};
PushService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], PushService);
exports.PushService = PushService;
//# sourceMappingURL=push.service.js.map