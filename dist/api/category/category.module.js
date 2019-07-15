"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const category_controller_1 = require("./category.controller");
const category_service_1 = require("./category.service");
const category_providers_1 = require("./category.providers");
const database_module_1 = require("../../common/database/database.module");
let CategoryModule = class CategoryModule {
};
CategoryModule = __decorate([
    common_1.Module({
        imports: [database_module_1.DatabaseModule],
        controllers: [category_controller_1.CategoryController],
        providers: [category_service_1.CategoryService, ...category_providers_1.categoryProviders],
    })
], CategoryModule);
exports.CategoryModule = CategoryModule;
//# sourceMappingURL=category.module.js.map