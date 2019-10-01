import { ApiModelProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateNotificationDto {
  constructor(room: string, user: string, type: string, isRead: boolean = false) {
    this.room = room;
    this.user = user;
    this.type = type;
    this.isRead = isRead;
  }

  @ApiModelProperty({ type: String })
  @IsOptional()
  user: string;

  @ApiModelProperty({ type: String })
  @IsOptional()
  room: string;

  @ApiModelProperty({ type: String })
  @IsOptional()
  type: string;

  @ApiModelProperty({ type: Boolean })
  @IsOptional()
  isRead: boolean;
}
