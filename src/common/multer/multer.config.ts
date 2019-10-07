import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from './../config/config.service';
const s3Storage = require('multer-sharp-s3');

// Multer configuration
export const multerConfig = {
  dest: 'upload',
};

// Multer upload options
export const multerOptions = () => {
  const config = new ConfigService();
  const s3 = new AWS.S3();
  console.log(config.bucketId);
  AWS.config.update({
    region: config.bucketRegion,
    accessKeyId: config.bucketId,
    secretAccessKey: config.bucketKey,
  });  
  return {
    // Enable file size limits
    limits: {
      fileSize: 1 * 1024 * 1024,
    },
    // Check the mimetypes to allow for upload
    fileFilter: (req: any, file: any, cb: any) => {
      if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        // Allow storage of file
        cb(null, true);
      } else {
        // Reject file
        cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
      }
    },

    // Storage properties
    // local
    // storage: diskStorage({
    //   // Destination storage path details
    //   destination: (req: any, file: any, cb: any) => {
    //     const uploadPath = multerConfig.dest;
    //     // Create folder if doesn't exist
    //     if (!existsSync(uploadPath)) {
    //       mkdirSync(uploadPath);
    //     }
    //     cb(null, uploadPath);
    //   },
    //   // File modification details
    //   filename: (req: any, file: any, cb: any) => {
    //     // Calling the callback passing the random name generated with the original extension name
    //     cb(null, `${uuid()}${extname(file.originalname)}`);
    //   },
    // }),

    // s3
    storage: s3Storage({
      s3: s3,
      Bucket: config.bucketName,
      ACL: 'public-read',
      Key: (req: any, file: any, cb: any) => {
        let date = new Date();
        cb(null, `${date.getMonth() + 1}/${uuid()}${extname(file.originalname)}`)
      },
      resize: {
        width: 400,
        height: 400,
      },
    }),
  }
};
