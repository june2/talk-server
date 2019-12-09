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
const aws_cloudwatch_log_1 = require("aws-cloudwatch-log");
const config_service_1 = require("./../config/config.service");
const moment = require("moment");
let LoggerService = class LoggerService {
    constructor() {
        const config = new config_service_1.ConfigService();
        const today = moment(new Date()).format('YYYY-MM-DD');
        this.option = {
            logGroupName: 'test',
            region: config.bucketRegion,
            accessKeyId: config.bucketId,
            secretAccessKey: config.bucketKey,
            uploadFreq: 10000,
            local: false
        };
        aws_cloudwatch_log_1.createLogStream(today, this.option);
    }
    setConfig(group, stream) {
    }
    info() {
    }
};
LoggerService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], LoggerService);
exports.LoggerService = LoggerService;
//# sourceMappingURL=logger.service.js.map