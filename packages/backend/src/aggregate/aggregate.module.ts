import { Module } from '@nestjs/common';
import { LeaseInvoicesModule } from 'src/lease-invoices/lease-invoices.module';
import { AggregateService } from './aggregate.service';

@Module({
	controllers: [],
	providers: [AggregateService],
	imports: [LeaseInvoicesModule],
	exports: [AggregateService],
})
export class AggregateModule {}
