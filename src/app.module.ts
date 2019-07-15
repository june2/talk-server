import { Module } from '@nestjs/common';
import { ConfigModule } from './common/config/config.module';
import { CategoryModule } from './api/category/category.module';

@Module({
  imports: [
    ConfigModule,
    CategoryModule
  ],
})
export class ApplicationModule {}
