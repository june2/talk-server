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
const config_service_1 = require("../config/config.service");
const AWS = require("aws-sdk");
let SfService = class SfService {
    constructor() {
        const config = new config_service_1.ConfigService();
        AWS.config.update({
            region: config.bucketRegion,
            accessKeyId: config.bucketId,
            secretAccessKey: config.bucketKey,
        });
        this.sf = new AWS.StepFunctions();
    }
    excute(user, to, text, room) {
        try {
            const input = {
                wait: ((Math.floor(Math.random() * 100) + 1) * 10),
                user: user,
                to: to,
                text: text,
                room: room
            };
            const params = {
                stateMachineArn: 'arn:aws:iam::308674859491:role/service-role/stepfunction',
                input: JSON.stringify(input)
            };
            this.sf.startExecution(params, function (err, data) {
                if (err)
                    console.error(err, err.stack);
                else
                    console.log(data);
            });
        }
        catch (err) {
            console.error(`sf: ${err}`);
        }
    }
};
SfService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], SfService);
exports.SfService = SfService;
//# sourceMappingURL=sf.service.js.map