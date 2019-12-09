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
const config_service_1 = require("./../config/config.service");
const aws_cloudwatch_log_1 = require("aws-cloudwatch-log");
const moment = require("moment");
let ErrorFilter = class ErrorFilter {
    constructor(config) {
        this.config = config;
    }
    catch(error, host) {
        let response = host.switchToHttp().getResponse();
        let status = (error instanceof common_1.HttpException) ? error.getStatus() : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        if (status === 500) {
            const ctx = host.switchToHttp();
            const request = ctx.getRequest();
            const date = moment(new Date()).format('YYYY-MM-DD/HH/mm/s');
            const option = {
                logGroupName: 'talk-sever-error',
                logStreamName: date,
                region: this.config.bucketRegion,
                accessKeyId: this.config.bucketId,
                secretAccessKey: this.config.bucketKey,
                uploadFreq: 10000,
                local: false
            };
            const logger = new aws_cloudwatch_log_1.Logger(option);
            aws_cloudwatch_log_1.createLogStream(date, option).then(data => {
                logger.log(`url : ${request.url}`);
                logger.log(`method : ${request.method}`);
                logger.log(`headers : ${JSON.stringify(request.headers)}`);
                logger.log(`body : ${JSON.stringify(request.body)}`);
                logger.log(`name : ${error.name}`);
                logger.log(`message : ${JSON.stringify(error.message)}`);
                logger.log(`stack :${JSON.stringify(error.stack)}}`);
            });
        }
        return response.status(status).send(error.message);
    }
};
ErrorFilter = __decorate([
    common_1.Catch(),
    __metadata("design:paramtypes", [config_service_1.ConfigService])
], ErrorFilter);
exports.ErrorFilter = ErrorFilter;
//# sourceMappingURL=error.filter.js.map