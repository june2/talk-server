import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from './../config/config.service'

@Injectable()
export class MasterGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService
  ) { }

  canActivate(context: ExecutionContext): boolean {

    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }    
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    const hasRole = () => token === this.configService.masterKey ? true : false;

    return hasRole();
  }
}
