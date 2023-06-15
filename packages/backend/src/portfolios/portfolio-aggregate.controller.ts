import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AggregateService } from 'src/aggregate/aggregate.service';
import {
	AggregateOptionsExpensesDto,
	GetOccupancyOptionsDto,
} from 'src/aggregate/dto/aggregate-options.dto';
import {
	aggregateOptionsExpensesSchema,
	aggregateOptionsSchema,
} from 'src/aggregate/dto/aggregate-options.schema';
import {
	GroupByCategoryDto,
	GroupByLocationDto,
	GroupByMonthDto,
} from 'src/aggregate/dto/grouped-by-month.dto';
import { Occupancy } from 'src/aggregate/dto/occupancy.dto';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { Action } from 'src/casl/action.enum';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';

@Controller('organizations/:organizationId/portfolios/:portfolioId/aggregate')
@ApiTags('portfolios')
@SwaggerAuth()
export class PortfolioAggregateController {
	constructor(private readonly aggregateService: AggregateService) {}

	@Get('/expenses')
	@CheckAbilities({
		action: Action.Read,
		subject: 'Portfolio',
		useParams: true,
		overrideParams: {
			portfolioId: 'id',
		},
	})
	// Will NOT return a 404 if all the following is true:
	// 1. the portfolio does not exist
	// 2. user.role is ORGADMIN & has access to organizationId in params
	getExpensesByMonth(
		@Param('organizationId') organizationId: string,
		@Param('portfolioId') portfolioId: string,
		@Query(new ZodValidationPipe(aggregateOptionsExpensesSchema))
		queryOptions: AggregateOptionsExpensesDto,
	): Promise<GroupByMonthDto[]> {
		return this.aggregateService.portfolioExpensesByMonth({
			organizationId,
			portfolioId,
			options: queryOptions,
		});
	}

	@Get('/expenses-by-category')
	@CheckAbilities({
		action: Action.Read,
		subject: 'Portfolio',
		useParams: true,
		overrideParams: {
			portfolioId: 'id',
		},
	})
	// Will NOT return a 404 if all the following is true:
	// 1. the portfolio does not exist
	// 2. user.role is ORGADMIN & has access to organizationId in params
	getExpensesByCategory(
		@Param('organizationId') organizationId: string,
		@Param('portfolioId') portfolioId: string,
		@Query(new ZodValidationPipe(aggregateOptionsExpensesSchema))
		queryOptions: AggregateOptionsExpensesDto,
	): Promise<GroupByCategoryDto[]> {
		return this.aggregateService.portfolioExpensesByCategory({
			organizationId,
			portfolioId,
			options: queryOptions,
		});
	}

	@Get('/expenses-by-location')
	@CheckAbilities({
		action: Action.Read,
		subject: 'Portfolio',
		useParams: true,
		overrideParams: {
			portfolioId: 'id',
		},
	})
	// Will NOT return a 404 if all the following is true:
	// 1. the portfolio does not exist
	// 2. user.role is ORGADMIN & has access to organizationId in params
	getExpensesByLocation(
		@Param('organizationId') organizationId: string,
		@Param('portfolioId') portfolioId: string,
		@Query(new ZodValidationPipe(aggregateOptionsExpensesSchema))
		queryOptions: AggregateOptionsExpensesDto,
	): Promise<GroupByLocationDto[]> {
		return this.aggregateService.portfolioExpensesByLocation({
			organizationId,
			portfolioId,
			options: queryOptions,
		});
	}

	@Get('/occupancy')
	@CheckAbilities({
		action: Action.Read,
		subject: 'Portfolio',
		useParams: true,
		overrideParams: {
			portfolioId: 'id',
		},
	})
	// Will NOT return a 404 if all the following is true:
	// 1. the portfolio does not exist
	// 2. user.role is ORGADMIN & has access to organizationId in params
	getOccupancy(
		@Param('organizationId') organizationId: string,
		@Param('portfolioId') portfolioId: string,
		@Query(new ZodValidationPipe(aggregateOptionsSchema))
		queryOptions: GetOccupancyOptionsDto,
	): Promise<Occupancy[]> {
		return this.aggregateService.getOccupancy({
			organizationId,
			portfolioId,
			options: queryOptions,
		});
	}
}
