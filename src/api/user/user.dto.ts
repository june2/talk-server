import { ApiModelProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsBoolean, IsOptional, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiModelProperty()
  @IsEmail()
  email: string;

  @ApiModelProperty({ type: String })
  @IsString()
  password: string;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsOptional()
  name: string;
}

export class UpdateUserDto {
  @ApiModelProperty({ type: String })
  @IsString()
  @IsOptional()
  readonly name: string;

  @ApiModelProperty({ type: Array })
  @IsOptional()  
  images: Array<object> = [];

  @ApiModelProperty({ type: String })
  @IsOptional()  
  location: string;

  @ApiModelProperty({ type: String })
  @IsOptional()  
  intro: string;
}