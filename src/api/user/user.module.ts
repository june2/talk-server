import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { UserController } from './user.controller';
import { UserAdminController } from './user.admin.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }])
  ],
  controllers: [UserAdminController, UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
