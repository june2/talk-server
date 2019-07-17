import { Module } from '@nestjs/common';
import { ConfigModule } from './common/config/config.module';
// import { CategoryModule } from './api/room/category.module';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/user/user.module';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    UserModule,
    // CategoryModule
  ],
})
export class ApplicationModule {}
