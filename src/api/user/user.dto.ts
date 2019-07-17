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
}