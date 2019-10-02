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
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateNotificationDto {
    constructor(room, user, type, isRead = false) {
        this.room = room;
        this.user = user;
        this.type = type;
        this.isRead = isRead;
    }
}
__decorate([
    swagger_1.ApiModelProperty({ type: String }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "user", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: String }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "room", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: String }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "type", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: Boolean }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Boolean)
], CreateNotificationDto.prototype, "isRead", void 0);
exports.CreateNotificationDto = CreateNotificationDto;
//# sourceMappingURL=notification.dto.js.map