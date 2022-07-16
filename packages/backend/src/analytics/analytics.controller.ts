import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  ByMonthDto,
  DashboardFilterDto,
} from 'src/analytics/dto/analytics.dto';
import { AnalyticsService } from './analytics.service';

@ApiTags('analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  // TODO abilitycheck
  @ApiOkResponse({ type: ByMonthDto, isArray: true })
  @Get('/incomeByMonth/:id')
  getIncomeByMonth(
    @Param('portfolioId') portfolioId: string,
    @Query() filter: DashboardFilterDto,
  ): Promise<ByMonthDto[]> {
    return this.analyticsService.incomeByMonth({ portfolioId, filter });
  }

  @ApiOkResponse({ type: ByMonthDto, isArray: true })
  @Get('/expensesByMonth/:id')
  getExpensesByMonth(
    @Param('portfolioId') portfolioId: string,
    @Query() filter: DashboardFilterDto,
  ): Promise<ByMonthDto[]> {
    return this.analyticsService.expensesByMonth({ portfolioId, filter });
  }
}
