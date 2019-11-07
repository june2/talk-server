import { Model } from 'mongoose';
import { CreatePurchaseDto } from './purchase.dto';
import { Purchase } from './purchase.interface';
export declare class PurchaseService {
    private readonly purchase;
    constructor(purchase: Model<Purchase>);
    create(createPurchaseDto: CreatePurchaseDto): Promise<Purchase>;
}
