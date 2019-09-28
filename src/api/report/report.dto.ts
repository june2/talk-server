import { ApiModelProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateReportDto {
  @ApiModelProperty({ type: String })
  @IsOptional()
  to: string;

  @ApiModelProperty({ type: String })
  @IsOptional()
  from: string;

  @ApiModelProperty({ type: String })
  @IsOptional()
  msg: string;

  @ApiModelProperty({ type: Number })
  @IsOptional()
  option: number;
}
