import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PurchaseSchema } from './purchase.schema';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { UserModule } from './../user/user.module';
import { IapModule } from './../../common/iap/iap.module';

@Module({
  imports: [
    UserModule,
    IapModule,
    MongooseModule.forFeature([{ name: 'purchase', schema: PurchaseSchema }])
  ],
  controllers: [PurchaseController],
  providers: [PurchaseService],
})
export class PurchaseModule { }