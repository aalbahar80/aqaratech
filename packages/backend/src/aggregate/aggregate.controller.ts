import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
	ByMonthDto,
	DashboardFilterDto,
} from 'src/aggregate/dto/aggregate.dto';
import { Occupancy } from 'src/aggregate/dto/occupancy.dto';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { Action } from 'src/casl/casl-ability.factory';
import { User } from 'src/decorators/user.decorator';
import { IUser } from 'src/interfaces/user.interface';
import { LeaseInvoiceOptionsDto } from 'src/lease-invoices/dto/lease-invoice-options.dto';
import { AggregateService } from './aggregate.service';

@ApiTags('aggregate')
@Controller('aggregate')
export class AggregateController {
	constructor(private readonly aggregateService: AggregateService) {}

	@Get('/incomeByMonth')
	@CheckAbilities(
		{ action: Action.Read, subject: 'LeaseInvoice' },
		{ action: Action.Read, subject: 'Portfolio' },
		{ action: Action.Read, subject: 'Property' },
		{ action: Action.Read, subject: 'Unit' },
	)
	@ApiOkResponse({ type: ByMonthDto, isArray: true })
	getIncomeByMonth(
		@User() user: IUser,
		@Query() pageOptionsDto: LeaseInvoiceOptionsDto,
	): Promise<ByMonthDto[]> {
		return this.aggregateService.incomeByMonth({ pageOptionsDto, user });
	}

	@Get('/expensesByMonth')
	@CheckAbilities(
		{ action: Action.Read, subject: 'Expense' },
		{ action: Action.Read, subject: 'Portfolio' },
		{ action: Action.Read, subject: 'Property' },
		{ action: Action.Read, subject: 'Unit' },
	)
	@ApiOkResponse({ type: ByMonthDto, isArray: true })
	getExpensesByMonth(
		@User() user: IUser,
		@Query() filter: DashboardFilterDto,
	): Promise<ByMonthDto[]> {
		return this.aggregateService.expensesByMonth({ filter, user });
	}

	@Get('/occupancy')
	@CheckAbilities(
		{ action: Action.Read, subject: 'Portfolio' },
		{ action: Action.Read, subject: 'Property' },
		{ action: Action.Read, subject: 'Unit' },
		{ action: Action.Read, subject: 'Lease' },
	)
	@ApiOkResponse({ type: Occupancy, isArray: true })
	getOccupancy(
		@User() user: IUser,
		@Query() filter: DashboardFilterDto,
	): Promise<Occupancy[]> {
		return this.aggregateService.getOccupancy({ filter, user });
	}
}
