import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { portfolioUpdateSchema } from '@self/utils';
import { AggregateService } from 'src/aggregate/aggregate.service';
import { BalanceDto } from 'src/aggregate/dto/balance.dto';
import { SkipAbilityCheck } from 'src/auth/public.decorator';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { Action } from 'src/casl/action.enum';
import { WithCount } from 'src/common/dto/paginated.dto';
import { QueryOptionsDto } from 'src/common/dto/query-options.dto';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response';
import {
	ApiQueryOptions,
	QueryParser,
} from 'src/decorators/query-options.decorator';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { User } from 'src/decorators/user.decorator';
import { ExpenseDto } from 'src/expenses/dto/expense.dto';
import { ExpensesService } from 'src/expenses/expenses.service';
import { IUser } from 'src/interfaces/user.interface';
import { LeaseInvoiceDto } from 'src/lease-invoices/dto/lease-invoice.dto';
import { LeaseInvoicesService } from 'src/lease-invoices/lease-invoices.service';
import { PayoutDto } from 'src/payouts/dto/payout.dto';
import { PayoutsService } from 'src/payouts/payouts.service';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { PropertyDto } from 'src/properties/dto/property.dto';
import { PropertiesService } from 'src/properties/properties.service';
import { RoleDto } from 'src/roles/dto/role.dto';
import { RolesService } from 'src/roles/roles.service';
import { UnitDto } from 'src/units/dto/unit.dto';
import { UnitsService } from 'src/units/units.service';
import { PortfolioDto, UpdatePortfolioDto } from './dto/portfolio.dto';
import { PortfoliosService } from './portfolios.service';

const SubjectType = 'Portfolio';

@Controller('portfolios')
@ApiTags('portfolios')
@SwaggerAuth()
export class PortfoliosController {
	constructor(
		private readonly portfoliosService: PortfoliosService,
		private readonly rolesService: RolesService,
		private readonly propertiesService: PropertiesService,
		private readonly payoutsService: PayoutsService,
		private readonly aggregateService: AggregateService,
		private readonly leaseInvoicesService: LeaseInvoicesService,
		private readonly unitsService: UnitsService,
		private readonly expensesService: ExpensesService,
	) {}

	@Get()
	@CheckAbilities({ action: Action.Read, subject: SubjectType })
	@ApiQueryOptions()
	@ApiPaginatedResponse(PortfolioDto)
	findAll(
		@User() user: IUser,
		@QueryParser() queryOptions: QueryOptionsDto,
	): Promise<WithCount<PortfolioDto>> {
		return this.portfoliosService.findAll({ queryOptions, user });
	}

	@Get(':id')
	@CheckAbilities({ action: Action.Read, subject: SubjectType })
	@ApiOkResponse({ type: PortfolioDto })
	findOne(@User() user: IUser, @Param('id') id: string): Promise<PortfolioDto> {
		return this.portfoliosService.findOne({ id, user });
	}

	@Patch(':id')
	@SkipAbilityCheck() // TODO rm
	update(
		@User() user: IUser,
		@Param('id') id: string,
		@Body(new ZodValidationPipe(portfolioUpdateSchema))
		updatePortfolioDto: UpdatePortfolioDto,
	): Promise<PortfolioDto> {
		return this.portfoliosService.update({ id, updatePortfolioDto, user });
	}

	@Delete(':id')
	@CheckAbilities({ action: Action.Delete, subject: SubjectType })
	@ApiOkResponse({ type: PortfolioDto })
	remove(@User() user: IUser, @Param('id') id: string): Promise<PortfolioDto> {
		return this.portfoliosService.remove({ id, user });
	}

	@Get(':id/roles')
	@CheckAbilities(
		{ action: Action.Read, subject: SubjectType },
		{ action: Action.Read, subject: 'Role' },
	)
	@ApiQueryOptions()
	@ApiPaginatedResponse(RoleDto)
	findRoles(
		@User() user: IUser,
		@QueryParser() queryOptions: QueryOptionsDto,
		@Param('id') id: string,
	): Promise<WithCount<RoleDto>> {
		const where: Prisma.RoleWhereInput = {
			portfolioId: id,
			roleType: 'PORTFOLIO',
		};
		return this.rolesService.findAll({ user, queryOptions, where });
	}

	@Get(':id/properties')
	@CheckAbilities(
		{ action: Action.Read, subject: SubjectType },
		{ action: Action.Read, subject: 'Property' },
	)
	@ApiQueryOptions()
	@ApiPaginatedResponse(PropertyDto)
	findProperties(
		@User() user: IUser,
		@QueryParser() queryOptions: QueryOptionsDto,
		@Param('id') id: string,
	): Promise<WithCount<PropertyDto>> {
		const where: Prisma.PropertyWhereInput = { portfolioId: { equals: id } };
		return this.propertiesService.findAll({ user, queryOptions, where });
	}

	@Get(':id/units')
	@CheckAbilities(
		{ action: Action.Read, subject: SubjectType },
		{ action: Action.Read, subject: 'Unit' },
	)
	@ApiQueryOptions()
	@ApiPaginatedResponse(UnitDto)
	findUnits(
		@User() user: IUser,
		@Param('id') id: string,
		@QueryParser() queryOptions: QueryOptionsDto,
	): Promise<WithCount<UnitDto>> {
		const where: Prisma.UnitWhereInput = {
			property: { portfolioId: { equals: id } },
		};
		return this.unitsService.findAll({ user, queryOptions, where });
	}

	@Get(':id/payouts')
	@CheckAbilities(
		{ action: Action.Read, subject: SubjectType },
		{ action: Action.Read, subject: 'Payout' },
	)
	@ApiQueryOptions()
	@ApiPaginatedResponse(PayoutDto)
	findPayouts(
		@User() user: IUser,
		@QueryParser() queryOptions: QueryOptionsDto,
		@Param('id') id: string,
	): Promise<WithCount<PayoutDto>> {
		const where: Prisma.PayoutWhereInput = { portfolioId: { equals: id } };
		return this.payoutsService.findAll({ user, queryOptions, where });
	}

	@Get(':id/balance')
	@CheckAbilities(
		{ action: Action.Read, subject: SubjectType },
		{ action: Action.Read, subject: 'Payout' },
		{ action: Action.Read, subject: 'Expense' },
		{ action: Action.Read, subject: 'LeaseInvoice' },
	)
	@ApiOkResponse({ type: BalanceDto })
	getBalance(
		@User() user: IUser,
		@Param('id') id: string,
	): Promise<BalanceDto> {
		return this.aggregateService.getBalance({ portfolioId: id, user });
	}

	@Get(':id/leaseInvoices')
	@CheckAbilities({
		action: Action.Read,
		subject: SubjectType,
		useParams: true,
		overrideParams: { portfolioId: 'id' },
	})
	@ApiQueryOptions()
	@ApiPaginatedResponse(LeaseInvoiceDto)
	findAllLeaseInvoices(
		@User() user: IUser,
		@Param('id') portfolioId: string,
		@QueryParser({
			parserOptions: { orderDefaultValue: 'postAt' },
			filterOptions: { keys: ['postAt', 'propertyId', 'unitId'] },
		})
		queryOptions: QueryOptionsDto,
	): Promise<WithCount<LeaseInvoiceDto>> {
		return this.leaseInvoicesService.findAll({
			queryOptions,
			user,
			where: { portfolioId },
		});
	}

	@Get(':id/expenses')
	@CheckAbilities({
		action: Action.Read,
		subject: SubjectType,
		// Enabling useParams here would prevent orgadmin from passing this guard.
		// If we really wanted to use useParams, we could have the guard grab the orgId from the db.
	})
	@ApiQueryOptions()
	@ApiPaginatedResponse(ExpenseDto)
	findAllExpenses(
		@User() user: IUser,
		@Param('id') portfolioId: string,
		@QueryParser({
			parserOptions: { orderDefaultValue: 'postAt' },
			filterOptions: { keys: ['postAt', 'propertyId', 'unitId'] },
		})
		queryOptions: QueryOptionsDto,
	): Promise<WithCount<ExpenseDto>> {
		return this.expensesService.findAll({
			queryOptions,
			user,
			portfolioId,
		});
	}
}
