import { ApiModelProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsBoolean, IsOptional, IsEmail } from 'class-validator';

export class CreateCategoryDto {
  @ApiModelProperty({ type: String })
  @IsString()
  id: string;

  @ApiModelProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  parentId: string;

  @ApiModelProperty({ type: Object })  
  @IsOptional()
  name: object;

  @ApiModelProperty({ type: Object, required: false })  
  @IsOptional()
  tags: object;
}

export class UpdateCategoryDto {
  @ApiModelProperty({ type: Object })
  @IsString()
  @IsOptional()
  readonly name: object;
}