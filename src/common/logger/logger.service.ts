import { Injectable, NestMiddleware } from '@nestjs/common';
import { Logger, createLogStream } from 'aws-cloudwatch-log';
import { ConfigService } from './../config/config.service';
import * as moment from 'moment';
import * as AWS from 'aws-sdk';

//TODO: logger module
@Injectable()
export class LoggerService {
  private readonly logger: Logger;
  private readonly option: any;
  
  constructor() {
    const config = new ConfigService();
    const today = moment(new Date()).format('YYYY-MM-DD');
    this.option = {
      logGroupName: 'test',
      // logStreamName: 'YourLogStream',
      region: config.bucketRegion,
      accessKeyId: config.bucketId,
      secretAccessKey: config.bucketKey,
      uploadFreq: 10000, 	// Optional. Send logs to AWS LogStream in batches after 10 seconds intervals.
      local: false 		// Optional. If set to true, the log will fall back to the standard 'console.log'.
    }
    createLogStream(today, this.option)
    // this.logger = new Logger(this.option);
  }

  setConfig(group, stream) {

  }

  info() {    
    // this.logger.log({ category: 'info', details: `test` })
  }


}
