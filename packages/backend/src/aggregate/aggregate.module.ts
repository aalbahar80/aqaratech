import { Module } from '@nestjs/common';
import { LeaseInvoicesModule } from 'src/lease-invoices/lease-invoices.module';
import { AggregateController } from './aggregate.controller';
import { AggregateService } from './aggregate.service';

@Module({
	controllers: [AggregateController],
	providers: [AggregateService],
	imports: [LeaseInvoicesModule],
	exports: [AggregateService],
})
export class AggregateModule {}
