import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  ByMonthDto,
  DashboardFilterDto,
} from 'src/analytics/dto/analytics.dto';
import { User } from 'src/decorators/user.decorator';
import { IUser } from 'src/interfaces/user.interface';
import { LeaseInvoiceOptionsDto } from 'src/lease-invoices/dto/lease-invoice-options.dto';
import { AnalyticsService } from './analytics.service';

@ApiTags('analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @ApiOkResponse({ type: ByMonthDto, isArray: true })
  @Get('/incomeByMonth')
  getIncomeByMonth(
    @User() user: IUser,
    @Query() pageOptionsDto: LeaseInvoiceOptionsDto,
  ): Promise<ByMonthDto[]> {
    return this.analyticsService.incomeByMonth({ pageOptionsDto, user });
  }

  @ApiOkResponse({ type: ByMonthDto, isArray: true })
  @Get('/expensesByMonth')
  getExpensesByMonth(
    @Query() filter: DashboardFilterDto,
  ): Promise<ByMonthDto[]> {
    return this.analyticsService.expensesByMonth({ filter });
  }
}
