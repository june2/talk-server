import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthAdminController } from './auth.admin.controller';
import { AuthService } from './auth.service';
import { UserModule } from './../user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants';
import { NotificationModule } from '../notification/notification.module';
import { NotificationService } from '../notification/notification.service';

@Module({
  imports: [
    UserModule,
    NotificationModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: jwtConstants.expiresIn,
      },
    }),
  ],
  controllers: [AuthAdminController, AuthController, ],
  providers: [AuthService, JwtStrategy, NotificationService],
})
export class AuthModule { }
