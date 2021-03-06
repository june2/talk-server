import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './common/config/config.module';
import { ConfigService } from './common/config/config.service';
import { PushModule } from './common/push/push.module';
import { LoggerModule } from './common/logger/logger.module';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/user/user.module';
import { RoomModule } from './api/room/room.module';
import { MessageModule } from './api/message/message.module';
import { ReportModule } from './api/report/report.module';
import { NotificationModule } from './api/notification/notification.module';
import { PurchaseModule } from './api/purchase/purchase.module';

@Module({
  imports: [
    ConfigModule,
    PushModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.uri,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    RoomModule,
    MessageModule,
    ReportModule,
    NotificationModule,
    PurchaseModule,
    // LoggerModule
  ]
})
export class ApplicationModule { }
