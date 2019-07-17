import { Module } from '@nestjs/common';
import { ConfigModule } from './common/config/config.module';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/user/user.module';
import { RoomModule } from './api/room/room.module';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    UserModule,
    RoomModule
  ],
})
export class ApplicationModule { }
