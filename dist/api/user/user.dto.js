"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const joi_1 = require("joi");
class CreateUserDto {
    constructor() {
        this.images = [];
    }
}
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: String }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: String }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: Array }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Array)
], CreateUserDto.prototype, "images", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: String }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "gender", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: joi_1.date }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Date)
], CreateUserDto.prototype, "birthday", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: String }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "location", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: String }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "locale", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: String }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "region", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: String }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "platformOS", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: String }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "platformVer", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: String }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "pushToken", void 0);
exports.CreateUserDto = CreateUserDto;
class CreateUserSampleDto {
    constructor(email, password, name, images, gender, birthday, country, location, intro, state = 'SAMPLE') {
        this.images = [];
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
}
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], CreateUserSampleDto.prototype, "email", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: String }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateUserSampleDto.prototype, "password", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: String }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateUserSampleDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: Array }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Array)
], CreateUserSampleDto.prototype, "images", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: String }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateUserSampleDto.prototype, "gender", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: joi_1.date }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Date)
], CreateUserSampleDto.prototype, "birthday", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: String }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateUserSampleDto.prototype, "country", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: String }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateUserSampleDto.prototype, "location", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: String }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateUserSampleDto.prototype, "intro", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: String }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateUserSampleDto.prototype, "state", void 0);
exports.CreateUserSampleDto = CreateUserSampleDto;
class UpdateUserDto {
    constructor() {
        this.images = [];
    }
}
__decorate([
    swagger_1.ApiModelProperty({ type: String }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: Array }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Array)
], UpdateUserDto.prototype, "images", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: String }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "location", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: String }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "gender", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: joi_1.date }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Date)
], UpdateUserDto.prototype, "birthday", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: String }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "intro", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: Boolean }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Boolean)
], UpdateUserDto.prototype, "isActivePush", void 0);
exports.UpdateUserDto = UpdateUserDto;
class UpdateUserPushTokenDto {
}
__decorate([
    swagger_1.ApiModelProperty({ type: String }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdateUserPushTokenDto.prototype, "PlatformOS", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: String }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdateUserPushTokenDto.prototype, "PlatformVer", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: String }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdateUserPushTokenDto.prototype, "pushToken", void 0);
exports.UpdateUserPushTokenDto = UpdateUserPushTokenDto;
class UpdateUserAdminDto {
    constructor() {
        this.images = [];
    }
}
__decorate([
    swagger_1.ApiModelProperty({ type: String }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateUserAdminDto.prototype, "state", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: String }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateUserAdminDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: Array }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Array)
], UpdateUserAdminDto.prototype, "images", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: String }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateUserAdminDto.prototype, "location", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: String }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateUserAdminDto.prototype, "gender", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: joi_1.date }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Date)
], UpdateUserAdminDto.prototype, "birthday", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: String }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateUserAdminDto.prototype, "intro", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: Boolean }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Boolean)
], UpdateUserAdminDto.prototype, "isActivePush", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: Number }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], UpdateUserAdminDto.prototype, "point", void 0);
exports.UpdateUserAdminDto = UpdateUserAdminDto;
//# sourceMappingURL=user.dto.js.map