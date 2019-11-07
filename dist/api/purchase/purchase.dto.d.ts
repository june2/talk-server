export declare class CreatePurchaseDto {
    user: string;
    productId: string;
    transactionDate: number;
    transactionId: string;
    transactionReceipt: string;
    service: string;
    result: any;
}
export declare class ResPurchaseDto {
    constructor(suceess: boolean, point: number);
    point: number;
    suceess: boolean;
}
