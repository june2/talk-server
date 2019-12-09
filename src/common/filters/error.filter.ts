import { ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { ConfigService } from './../config/config.service';
import { Logger, createLogStream } from 'aws-cloudwatch-log';
import * as moment from 'moment';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  private readonly config: ConfigService;

  constructor(config: ConfigService) {
    this.config = config;
  }

  catch(error: Error, host: ArgumentsHost) {
    let response = host.switchToHttp().getResponse();
    let status = (error instanceof HttpException) ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    if (status === 500) {
      const ctx = host.switchToHttp();
      const request = ctx.getRequest<Request>();
      const date = moment(new Date()).format('YYYY-MM-DD/HH/mm/s');
      const option = {
        logGroupName: 'talk-sever-error',
        logStreamName: date,
        region: this.config.bucketRegion,
        accessKeyId: this.config.bucketId,
        secretAccessKey: this.config.bucketKey,
        uploadFreq: 10000, 	// Optional. Send logs to AWS LogStream in batches after 10 seconds intervals.
        local: false 		// Optional. If set to true, the log will fall back to the standard 'console.log'.
      }
      const logger = new Logger(option);
      createLogStream(date, option).then(data => {
        logger.log(`url : ${request.url}`);
        logger.log(`method : ${request.method}`);
        logger.log(`headers : ${JSON.stringify(request.headers)}`);
        logger.log(`body : ${JSON.stringify(request.body)}`);
        logger.log(`name : ${error.name}`);
        logger.log(`message : ${JSON.stringify(error.message)}`);
        logger.log(`stack :${JSON.stringify(error.stack)}}`);
      })
    }
    return response.status(status).send(error.message);
  }
}