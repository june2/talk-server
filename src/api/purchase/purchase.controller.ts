import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import {
  UseGuards, Controller,
  Request, Body, Query, Param,
  Get, Post,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Purchase } from './purchase.interface';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto, ResPurchaseDto } from './purchase.dto';
import { UserService } from '../user/user.service';
import { IapService } from './../../common/iap/iap.service';
import { getPointById } from './../../common/product/data';

@ApiBearerAuth()
@ApiUseTags('Purchase')
@Controller('purchases')
export class PurchaseController {
  constructor(
    private readonly purchaseService: PurchaseService,
    private readonly iapService: IapService,
    private readonly userService: UserService
  ) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ title: 'Purchase ios item' })
  async create(@Body() createPurchaseDto: CreatePurchaseDto, @Request() req): Promise<ResPurchaseDto> {
    try {
      // check validation
      const res = await this.iapService.processPurchase(createPurchaseDto.transactionReceipt);
      // update user point
      let user = req.user;
      let point = getPointById(createPurchaseDto.productId);
      let updatePoint = user.point + point;
      await this.userService.updatePoint(user.id, updatePoint);
      // save history
      createPurchaseDto.user = user.id;
      createPurchaseDto.service = res.service;
      createPurchaseDto.result = res.receipt;
      await this.purchaseService.create(createPurchaseDto);
      // response
      return new ResPurchaseDto(true, updatePoint);
    } catch (err) {      
      return new ResPurchaseDto(false, null);
    }
  }
}
