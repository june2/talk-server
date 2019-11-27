import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from './../config/config.service';
export declare class MasterGuard implements CanActivate {
    private readonly reflector;
    private readonly configService;
    constructor(reflector: Reflector, configService: ConfigService);
    canActivate(context: ExecutionContext): boolean;
}
