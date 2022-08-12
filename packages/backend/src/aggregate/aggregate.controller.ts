import { Controller, Get, Query } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  ByMonthDto,
  DashboardFilterDto,
} from 'src/aggregate/dto/aggregate.dto';
import { ROLE_HEADER } from 'src/constants/header-role';
import { User } from 'src/decorators/user.decorator';
import { IUser } from 'src/interfaces/user.interface';
import { LeaseInvoiceOptionsDto } from 'src/lease-invoices/dto/lease-invoice-options.dto';
import { AggregateService } from './aggregate.service';

@ApiHeader({ name: ROLE_HEADER })
@ApiTags('aggregate')
@Controller('aggregate')
export class AggregateController {
  constructor(private readonly aggregateService: AggregateService) {}

  @ApiOkResponse({ type: ByMonthDto, isArray: true })
  @Get('/incomeByMonth')
  getIncomeByMonth(
    @User() user: IUser,
    @Query() pageOptionsDto: LeaseInvoiceOptionsDto,
  ): Promise<ByMonthDto[]> {
    return this.aggregateService.incomeByMonth({ pageOptionsDto, user });
  }

  @ApiOkResponse({ type: ByMonthDto, isArray: true })
  @Get('/expensesByMonth')
  getExpensesByMonth(
    @User() user: IUser,
    @Query() filter: DashboardFilterDto,
  ): Promise<ByMonthDto[]> {
    return this.aggregateService.expensesByMonth({ filter, user });
  }
}
