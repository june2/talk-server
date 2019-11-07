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
const purchase_schema_1 = require("./purchase.schema");
const purchase_service_1 = require("./purchase.service");
const purchase_controller_1 = require("./purchase.controller");
const user_module_1 = require("./../user/user.module");
const iap_module_1 = require("./../../common/iap/iap.module");
let PurchaseModule = class PurchaseModule {
};
PurchaseModule = __decorate([
    common_1.Module({
        imports: [
            user_module_1.UserModule,
            iap_module_1.IapModule,
            mongoose_1.MongooseModule.forFeature([{ name: 'purchase', schema: purchase_schema_1.PurchaseSchema }])
        ],
        controllers: [purchase_controller_1.PurchaseController],
        providers: [purchase_service_1.PurchaseService],
    })
], PurchaseModule);
exports.PurchaseModule = PurchaseModule;
//# sourceMappingURL=purchase.module.js.map