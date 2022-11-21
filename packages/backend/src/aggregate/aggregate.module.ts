import { Module } from '@nestjs/common';
import { ExpensesModule } from 'src/expenses/expenses.module';
import { LeaseInvoicesModule } from 'src/lease-invoices/lease-invoices.module';
import { AggregateService } from './aggregate.service';

@Module({
	controllers: [],
	providers: [AggregateService],
	imports: [LeaseInvoicesModule, ExpensesModule],
	exports: [AggregateService],
})
export class AggregateModule {}
