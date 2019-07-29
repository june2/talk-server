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
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const path_1 = require("path");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const config_service_1 = require("./common/config/config.service");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.ApplicationModule);
        const configService = app.get(config_service_1.ConfigService);
        app.useGlobalPipes(new common_1.ValidationPipe());
        app.useStaticAssets(path_1.join(__dirname, '..', 'upload'));
        const options = new swagger_1.DocumentBuilder()
            .setTitle('nest.js rest api example')
            .setDescription('nest.js rest API description')
            .setVersion('1.0')
            .addBearerAuth()
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, options);
        swagger_1.SwaggerModule.setup('api', app, document);
        yield app.listen(configService.port);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map