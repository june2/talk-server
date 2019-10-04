import { ApiModelProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsBoolean, IsOptional, IsEmail } from 'class-validator';
import { date } from 'joi';

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
}

export class CreateUserSampleDto {
  constructor(email, password, name, images, gender, birthday, location, intro, states = 'SAMPLE') {
    this.email = email;
    this.password = password;
    this.name = name;
    this.images = images;
    this.gender = gender;
    this.birthday = birthday;
    this.location = location;
    this.intro = intro;
    this.states = states;
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
  location: string;

  @ApiModelProperty({ type: String })
  @IsOptional()
  intro: string;
  
  @ApiModelProperty({ type: String })
  @IsOptional()
  states: string;
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
}

export class UpdateUserPushTokenDto {
  @ApiModelProperty({ type: String })
  @IsString()
  PlatformOS: string;

  @ApiModelProperty({ type: String })
  @IsString()
  PlatformVer: string;

  @ApiModelProperty({ type: String })
  @IsString()
  pushToken: string;
}