import { Controller, Get, Param } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  // TODO abilitycheck
  @Get('/incomeByMonth/:id')
  getIncomeByMonth(@Param('portfolioId') portfolioId: string) {
    return this.analyticsService.incomeByMonth(portfolioId);
  }

  @Get('/expensesByMonth/:id')
  getExpensesByMonth(@Param('portfolioId') portfolioId: string) {
    return this.analyticsService.expensesByMonth(portfolioId);
  }
}
