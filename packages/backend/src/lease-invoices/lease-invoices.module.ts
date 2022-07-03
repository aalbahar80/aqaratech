import { Module } from '@nestjs/common';
import { LeaseInvoicesService } from './lease-invoices.service';
import { LeaseInvoicesController } from './lease-invoices.controller';

@Module({
  controllers: [LeaseInvoicesController],
  providers: [LeaseInvoicesService],
  exports: [LeaseInvoicesService],
})
export class LeaseInvoicesModule {}
