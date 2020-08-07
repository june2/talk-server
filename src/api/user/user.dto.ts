import { ApiModelProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsBoolean, IsOptional, IsEmail } from 'class-validator';
import { date } from 'joi';
import { bool } from 'aws-sdk/clients/signer';

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

  @ApiModelProperty({ type: Array })
  @IsOptional()
  images: Array<string> = [];

  @ApiModelProperty({ type: String })
  @IsString()
  @IsOptional()
  gender: string;

  @ApiModelProperty({ type: date })
  @IsOptional()
  birthday: Date;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsOptional()
  location: string;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsOptional()
  locale: string;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsOptional()
  region: string;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsOptional()
  platformOS: string; 

  @ApiModelProperty({ type: String })
  @IsString()
  @IsOptional()
  platformVer: string;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsOptional()
  pushToken: string;
}

export class CreateUserSampleDto {
  constructor(email, password, name, images, gender, birthday, country, location, intro, state = 'SAMPLE') {
    this.email = email;
    this.password = password;
    this.name = name;
    this.images = images;
    this.gender = gender;
    this.birthday = birthday;
    this.country = country;
    this.location = location;
    this.intro = intro;
    this.state = state;
  }

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

  @ApiModelProperty({ type: Array })
  @IsOptional()
  images: Array<string> = [];

  @ApiModelProperty({ type: String })
  @IsString()
  @IsOptional()
  gender: string;

  @ApiModelProperty({ type: date })
  @IsOptional()
  birthday: Date;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsOptional()
  country: string;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsOptional()
  location: string;

  @ApiModelProperty({ type: String })
  @IsOptional()
  intro: string;

  @ApiModelProperty({ type: String })
  @IsOptional()
  state: string;
}

export class UpdateUserDto {
  @ApiModelProperty({ type: String })
  @IsString()
  @IsOptional()
  readonly name: string;

  @ApiModelProperty({ type: Array })
  @IsOptional()
  images: Array<string> = [];

  @ApiModelProperty({ type: String })
  @IsOptional()
  location: string;

  @ApiModelProperty({ type: String })
  @IsOptional()
  gender: string;

  @ApiModelProperty({ type: date })
  @IsOptional()
  birthday: Date;

  @ApiModelProperty({ type: String })
  @IsOptional()
  intro: string;

  @ApiModelProperty({ type: Boolean })
  @IsOptional()
  isActivePush: boolean;
}

export class UpdateUserPushTokenDto {
  @ApiModelProperty({ type: String })
  @IsString()
  platformOS: string;

  @ApiModelProperty({ type: String })
  @IsString()
  platformVer: string;

  @ApiModelProperty({ type: String })
  @IsString()
  pushToken: string;
}

export class AddBlockUserDto {
  @ApiModelProperty({ type: String })
  @IsString()
  blockId: string;
}

export class UpdateUserAdminDto {
  @ApiModelProperty({ type: String })
  @IsString()
  @IsOptional()
  readonly state: string;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsOptional()
  readonly name: string;

  @ApiModelProperty({ type: Array })
  @IsOptional()
  images: Array<string> = [];

  @ApiModelProperty({ type: String })
  @IsOptional()
  location: string;

  @ApiModelProperty({ type: String })
  @IsOptional()
  gender: string;

  @ApiModelProperty({ type: date })
  @IsOptional()
  birthday: Date;

  @ApiModelProperty({ type: String })
  @IsOptional()
  intro: string;

  @ApiModelProperty({ type: Boolean })
  @IsOptional()
  isActivePush: boolean;

  @ApiModelProperty({ type: Number })
  @IsOptional()
  point: number;
}

export class ReqRewardDto {
  @ApiModelProperty({ type: String })
  @IsString()
  @IsOptional()
  type: string;
}