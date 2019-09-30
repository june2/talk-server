import { Model } from 'mongoose';
import { CreateReportDto } from './report.dto';
import { Report } from './report.interface';
export declare class ReportService {
    private readonly report;
    constructor(report: Model<Report>);
    create(createReportDto: CreateReportDto): Promise<Report>;
}
