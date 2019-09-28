import { ApiModelProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsBoolean, IsOptional, IsEmail } from 'class-validator';

export class CreateRoomDto {
  constructor(users: Array<string>, lastMsg: string) {
    this.users = users;
    this.lastMsg = lastMsg;
  }

  @ApiModelProperty({ type: Array })
  @IsOptional()
  users: Array<string> = [];

  @ApiModelProperty({ type: String })
  @IsOptional()
  lastMsg: string;
}

export class ReqRoomDto {
  @ApiModelProperty({ type: String })
  @IsOptional()
  userId: string;

  @ApiModelProperty({ type: String })
  @IsOptional()
  lastMsg: string;
}