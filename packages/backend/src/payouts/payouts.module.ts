import { Module } from '@nestjs/common';
import { PayoutsService } from './payouts.service';
import { PayoutsController } from './payouts.controller';

@Module({
  controllers: [PayoutsController],
  providers: [PayoutsService]
})
export class PayoutsModule {}
