import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto, ResPurchaseDto } from './purchase.dto';
import { UserService } from '../user/user.service';
import { IapService } from './../../common/iap/iap.service';
export declare class PurchaseController {
    private readonly purchaseService;
    private readonly iapService;
    private readonly userService;
    constructor(purchaseService: PurchaseService, iapService: IapService, userService: UserService);
    create(createPurchaseDto: CreatePurchaseDto, req: any): Promise<ResPurchaseDto>;
}
