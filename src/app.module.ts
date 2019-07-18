import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './common/config/config.module';
import { ConfigService } from './common/config/config.service';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/user/user.module';
import { RoomModule } from './api/room/room.module';

@Module({
  imports: [
    ConfigModule,
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
    RoomModule
  ]
})
export class ApplicationModule { }
