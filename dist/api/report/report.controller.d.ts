import { CreateReportDto } from './report.dto';
import { ReportService } from './report.service';
import { Report } from './report.interface';
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    create(createReportDto: CreateReportDto): Promise<Report>;
}
