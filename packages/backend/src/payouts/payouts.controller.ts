import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePayoutDto, UpdatePayoutDto } from 'src/payouts/dto/payout.dto';
import { PayoutsService } from './payouts.service';

@Controller('payouts')
export class PayoutsController {
  constructor(private readonly payoutsService: PayoutsService) {}

  @Post()
  create(@Body() createPayoutDto: CreatePayoutDto) {
    return this.payoutsService.create(createPayoutDto);
  }

  @Get()
  findAll() {
    return this.payoutsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.payoutsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePayoutDto: UpdatePayoutDto) {
    return this.payoutsService.update(+id, updatePayoutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.payoutsService.remove(+id);
  }
}
