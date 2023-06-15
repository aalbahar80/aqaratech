import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AggregateGuard } from 'src/aggregate/aggregate.guard';
import { AggregateService } from 'src/aggregate/aggregate.service';
import { AggregateOptionsDto } from 'src/aggregate/dto/aggregate-options.dto';
import { aggregateOptionsSchema } from 'src/aggregate/dto/aggregate-options.schema';
import { IncomeByMonthDto } from 'src/aggregate/dto/grouped-by-month.dto';
import { PaidStatus } from 'src/constants/paid-status.enum';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { User } from 'src/decorators/user.decorator';
import { IUser } from 'src/interfaces/user.interface';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';

@Controller('organizations/:organizationId/aggregate')
@ApiTags('organizations')
@SwaggerAuth()
export class AggregateController {
	constructor(private readonly aggregateService: AggregateService) {}

	@Get('/income')
	@UseGuards(AggregateGuard)
	async getIncomeByMonth(
		@User() user: IUser,
		@Param('organizationId') organizationId: string,
		@Query(new ZodValidationPipe(aggregateOptionsSchema))
		queryOptions: AggregateOptionsDto,
	): Promise<IncomeByMonthDto> {
		const [total, paid, unpaid] = await Promise.all([
			this.aggregateService.incomeByMonth({
				user,
				organizationId,
				options: queryOptions,
				paidStatus: PaidStatus.ALL,
			}),

			this.aggregateService.incomeByMonth({
				user,
				organizationId,
				options: queryOptions,
				paidStatus: PaidStatus.PAID,
			}),

			this.aggregateService.incomeByMonth({
				user,
				organizationId,
				options: queryOptions,
				paidStatus: PaidStatus.UNPAID,
			}),
		]);

		return { total, paid, unpaid };
	}
}
