import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AggregateService } from 'src/aggregate/aggregate.service';
import { AggregateOptionsDto } from 'src/aggregate/dto/aggregate-options.dto';
import { aggregateOptionsSchema } from 'src/aggregate/dto/aggregate-options.schema';
import { GroupByMonthDto } from 'src/aggregate/dto/grouped-by-month.dto';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { Action } from 'src/casl/action.enum';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';

@Controller('organizations/:organizationId/portfolios/:portfolioId/aggregate')
@ApiTags('portfolios')
@SwaggerAuth()
export class PortfolioAggregateController {
	constructor(private readonly aggregateService: AggregateService) {}

	@Get('/income')
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
	getIncomeByMonth(
		@Param('portfolioId') portfolioId: string,
		@Query(new ZodValidationPipe(aggregateOptionsSchema))
		queryOptions: AggregateOptionsDto,
	): Promise<GroupByMonthDto[]> {
		return this.aggregateService.portfolioIncomeByMonth({
			portfolioId,
			options: queryOptions,
		});
	}

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
		@Param('portfolioId') portfolioId: string,
		@Query(new ZodValidationPipe(aggregateOptionsSchema))
		queryOptions: AggregateOptionsDto,
	): Promise<GroupByMonthDto[]> {
		return this.aggregateService.portfolioExpensesByMonth({
			portfolioId,
			options: queryOptions,
		});
	}
}
