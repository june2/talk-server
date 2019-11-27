"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const Joi = require("joi");
const fs = require("fs");
class ConfigService {
    constructor() {
        const config = dotenv.parse(fs.readFileSync(`.env${process.env.NODE_ENV == null ? '' : '.' + process.env.NODE_ENV}`));
        this.envConfig = this.validateInput(config);
    }
    validateInput(envConfig) {
        const envVarsSchema = Joi.object({
            NODE_ENV: Joi.string()
                .valid(['development', 'production', 'test', 'provision'])
                .default('development'),
            PORT: Joi.number().default(3000),
            API_AUTH_ENABLED: Joi.boolean().required(),
            DB_URI: Joi.string().default('mongodb://localhost:27017/dev'),
            DB_TYPE: Joi.string().default('mongodb'),
            DB_HOST: Joi.string().default('localhost'),
            DB_PORT: Joi.number().default(27017),
            DB_NAME: Joi.string().default('nest'),
            DB_USER: Joi.string().default(null),
            DB_PWD: Joi.string().default(null),
            BUCKET_NAME: Joi.string().default(null),
            BUCKET_ID: Joi.string().default(null),
            BUCKET_KEY: Joi.string().default(null),
            BUCKET_REGION: Joi.string().default('ap-northeast-2'),
            FCM_KEY: Joi.string().default(null),
            MASTER_KEY: Joi.string().default(null),
        });
        const { error, value: validatedEnvConfig } = Joi.validate(envConfig, envVarsSchema);
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        return validatedEnvConfig;
    }
    get env() {
        return String(this.envConfig.NODE_ENV);
    }
    get isApiAuthEnabled() {
        return Boolean(this.envConfig.API_AUTH_ENABLED);
    }
    get port() {
        return Number(this.envConfig.PORT);
    }
    get dbType() {
        return String(this.envConfig.DB_TYPE);
    }
    get dbHost() {
        return String(this.envConfig.DB_HOST);
    }
    get dbPort() {
        return Number(this.envConfig.DB_PORT);
    }
    get dbName() {
        return String(this.envConfig.DB_NAME);
    }
    get dbUser() {
        return String(this.envConfig.DB_USER);
    }
    get dbPwd() {
        return String(this.envConfig.DB_PWD);
    }
    get uri() {
        return String(this.envConfig.DB_URI);
    }
    get bucketName() {
        return String(this.envConfig.BUCKET_NAME);
    }
    get bucketId() {
        return String(this.envConfig.BUCKET_ID);
    }
    get bucketKey() {
        return String(this.envConfig.BUCKET_KEY);
    }
    get bucketRegion() {
        return String(this.envConfig.BUCKET_REGION);
    }
    get fcmKey() {
        return String(this.envConfig.FCM_KEY);
    }
    get masterKey() {
        return String(this.envConfig.MASTER_KEY);
    }
}
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map