import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportSchema } from './report.schema';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'report', schema: ReportSchema }])],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule { }