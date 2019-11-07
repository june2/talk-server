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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const purchase_service_1 = require("./purchase.service");
const purchase_dto_1 = require("./purchase.dto");
const user_service_1 = require("../user/user.service");
const iap_service_1 = require("./../../common/iap/iap.service");
const data_1 = require("./../../common/product/data");
let PurchaseController = class PurchaseController {
    constructor(purchaseService, iapService, userService) {
        this.purchaseService = purchaseService;
        this.iapService = iapService;
        this.userService = userService;
    }
    create(createPurchaseDto, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.iapService.processPurchase(createPurchaseDto.transactionReceipt);
                let user = req.user;
                let point = data_1.getPointById(createPurchaseDto.productId);
                let updatePoint = user.point + point;
                yield this.userService.updatePoint(user.id, updatePoint);
                createPurchaseDto.user = user.id;
                createPurchaseDto.service = res.service;
                createPurchaseDto.result = res.receipt;
                yield this.purchaseService.create(createPurchaseDto);
                return new purchase_dto_1.ResPurchaseDto(true, updatePoint);
            }
            catch (err) {
                return new purchase_dto_1.ResPurchaseDto(false, null);
            }
        });
    }
};
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Post(),
    swagger_1.ApiOperation({ title: 'Purchase ios item' }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [purchase_dto_1.CreatePurchaseDto, Object]),
    __metadata("design:returntype", Promise)
], PurchaseController.prototype, "create", null);
PurchaseController = __decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiUseTags('Purchase'),
    common_1.Controller('purchases'),
    __metadata("design:paramtypes", [purchase_service_1.PurchaseService,
        iap_service_1.IapService,
        user_service_1.UserService])
], PurchaseController);
exports.PurchaseController = PurchaseController;
//# sourceMappingURL=purchase.controller.js.map