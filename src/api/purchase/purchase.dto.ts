import { ApiModelProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreatePurchaseDto {

  @ApiModelProperty({ type: String })
  @IsOptional()
  user: string;

  @ApiModelProperty({ type: String })
  @IsOptional()
  productId: string;

  @ApiModelProperty({ type: Number })
  @IsOptional()
  transactionDate: number;

  @ApiModelProperty({ type: String })
  @IsOptional()
  transactionId: string;

  @ApiModelProperty({ type: String })
  @IsOptional()
  transactionReceipt: string;

  @ApiModelProperty({ type: String })
  @IsOptional()
  service: string;

  @ApiModelProperty({ type: Object })
  @IsOptional()
  result: any;
}

export class ResPurchaseDto {
  constructor(suceess: boolean, point: number) {
    this.suceess = suceess;
    this.point = point;
  }
  point: number;
  suceess: boolean;
}