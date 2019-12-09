import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { ConfigService } from './../config/config.service';
export declare class ErrorFilter implements ExceptionFilter {
    private readonly config;
    constructor(config: ConfigService);
    catch(error: Error, host: ArgumentsHost): any;
}
