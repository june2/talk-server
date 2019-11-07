import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePurchaseDto } from './purchase.dto';
import { Purchase } from './purchase.interface';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectModel('purchase') private readonly purchase: Model<Purchase>,
  ) { }

  async create(createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    const created = new this.purchase(createPurchaseDto);
    return await created.save();
  }
}
