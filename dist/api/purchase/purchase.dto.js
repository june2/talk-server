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
class CreatePurchaseDto {
}
__decorate([
    swagger_1.ApiModelProperty({ type: String }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreatePurchaseDto.prototype, "user", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: String }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreatePurchaseDto.prototype, "productId", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: Number }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], CreatePurchaseDto.prototype, "transactionDate", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: String }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreatePurchaseDto.prototype, "transactionId", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: String }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreatePurchaseDto.prototype, "transactionReceipt", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: String }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreatePurchaseDto.prototype, "service", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: Object }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Object)
], CreatePurchaseDto.prototype, "result", void 0);
exports.CreatePurchaseDto = CreatePurchaseDto;
class ResPurchaseDto {
    constructor(suceess, point) {
        this.suceess = suceess;
        this.point = point;
    }
}
exports.ResPurchaseDto = ResPurchaseDto;
//# sourceMappingURL=purchase.dto.js.map