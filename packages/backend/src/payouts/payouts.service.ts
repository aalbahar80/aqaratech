import { Injectable } from '@nestjs/common';
import { CreatePayoutDto, UpdatePayoutDto } from 'src/payouts/dto/payout.dto';

@Injectable()
export class PayoutsService {
  create(createPayoutDto: CreatePayoutDto) {
    return 'This action adds a new payout';
  }

  findAll() {
    return `This action returns all payouts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payout`;
  }

  update(id: number, updatePayoutDto: UpdatePayoutDto) {
    return `This action updates a #${id} payout`;
  }

  remove(id: number) {
    return `This action removes a #${id} payout`;
  }
}
