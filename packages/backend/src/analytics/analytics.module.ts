import { Module } from '@nestjs/common';
import { ExpensesModule } from 'src/expenses/expenses.module';
import { LeaseInvoicesModule } from 'src/lease-invoices/lease-invoices.module';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';

@Module({
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  imports: [LeaseInvoicesModule, ExpensesModule],
})
export class AnalyticsModule {}
