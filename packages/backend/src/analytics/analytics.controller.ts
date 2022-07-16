import { Controller, Get, Query } from '@nestjs/common';
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
  getIncomeByMonth(@Query() filter: DashboardFilterDto): Promise<ByMonthDto[]> {
    return this.analyticsService.incomeByMonth({ filter });
  }

  @ApiOkResponse({ type: ByMonthDto, isArray: true })
  @Get('/expensesByMonth/:id')
  getExpensesByMonth(
    @Query() filter: DashboardFilterDto,
  ): Promise<ByMonthDto[]> {
    return this.analyticsService.expensesByMonth({ filter });
  }
}
