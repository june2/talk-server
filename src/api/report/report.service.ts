import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReportDto } from './report.dto';
import { Report } from './report.interface';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel('report') private readonly report: Model<Report>,
  ) { }

  async create(createReportDto: CreateReportDto): Promise<Report> {
    const created = new this.report(createReportDto);
    return await created.save();
  }
}
