import {
  ApiBearerAuth,
  ApiOperation,  
  ApiUseTags,
} from '@nestjs/swagger';
import {
  UseGuards, Controller,
  Request, Body, Query, Param,
  UnauthorizedException,
  Get, Post, Delete
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateReportDto } from './report.dto';
import { ReportService } from './report.service';
import { Report } from './report.interface';

@ApiBearerAuth()
@ApiUseTags('Report')
@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ title: 'Create room' })
  async create(@Body() createReportDto: CreateReportDto): Promise<Report> {      
    return this.reportService.create(createReportDto); 
  }
}
