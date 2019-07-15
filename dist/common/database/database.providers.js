"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const config_service_1 = require("../config/config.service");
const config = new config_service_1.ConfigService();
exports.databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: () => __awaiter(this, void 0, void 0, function* () { return yield mongoose.connect(config.uri, { useNewUrlParser: true, useCreateIndex: true }); }),
    },
];
//# sourceMappingURL=database.providers.js.map