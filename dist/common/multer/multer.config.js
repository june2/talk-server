"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const uuid_1 = require("uuid");
const common_1 = require("@nestjs/common");
const AWS = require("aws-sdk");
const config_service_1 = require("./../config/config.service");
const s3Storage = require('multer-sharp-s3');
exports.multerConfig = {
    dest: 'upload',
};
exports.multerOptions = (type) => {
    const config = new config_service_1.ConfigService();
    const s3 = new AWS.S3();
    AWS.config.update({
        region: config.bucketRegion,
        accessKeyId: config.bucketId,
        secretAccessKey: config.bucketKey,
    });
    return {
        limits: {
            fileSize: 5 * 1024 * 1024,
        },
        fileFilter: (req, file, cb) => {
            if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
                cb(null, true);
            }
            else {
                cb(new common_1.HttpException(`Unsupported file type ${path_1.extname(file.originalname)}`, common_1.HttpStatus.BAD_REQUEST), false);
            }
        },
        storage: s3Storage({
            s3: s3,
            Bucket: config.bucketName,
            ACL: 'public-read',
            Key: (req, file, cb) => {
                let date = new Date();
                cb(null, `${type}/${date.getMonth() + 1}/${uuid_1.v4()}${path_1.extname(file.originalname)}`);
            },
            resize: {
                width: 800,
                height: 800,
            },
        }),
    };
};
//# sourceMappingURL=multer.config.js.map