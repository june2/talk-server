import { ApiModelProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsBoolean, IsOptional, IsEmail } from 'class-validator';

export class CreateMessageDto {
  constructor(room: string, user: string, text: string, system: boolean = false) {
    this.room = room;
    this.user = user;
    this.text = text;
    this.system = system;
  }

  @ApiModelProperty({ type: String })
  @IsOptional()
  room: string;

  @ApiModelProperty({ type: String })
  @IsOptional()
  user: string;

  @ApiModelProperty({ type: String })
  @IsOptional()
  text: string;

  @ApiModelProperty({ type: String })
  @IsOptional()
  image: string;

  @ApiModelProperty({ type: String })
  @IsOptional()
  video: string;

  @ApiModelProperty({ type: Boolean })
  @IsOptional()
  system: boolean;

  @ApiModelProperty({ type: Object })
  @IsOptional()
  quickReplies: object;

  @ApiModelProperty({ type: Object })
  @IsOptional()
  to: string;
}
