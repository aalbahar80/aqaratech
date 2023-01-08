import {
	Body,
	Controller,
	MaxFileSizeValidator,
	Param,
	ParseFilePipe,
	Post,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
	ApiBody,
	ApiConsumes,
	ApiCreatedResponse,
	ApiTags,
} from '@nestjs/swagger';

import {
	expenseCreateSchema,
	fileCreateSchema,
	leaseCreateSchema,
	leaseInvoiceCreateManySchema,
	leaseInvoiceCreateSchema,
	payoutCreateSchema,
	portfolioCreateSchema,
	propertyCreateSchema,
	tenantCreateSchema,
	unitCreateSchema,
} from '@self/utils';

import { CheckAbilities } from 'src/casl/abilities.decorator';
import { Action } from 'src/casl/action.enum';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { User } from 'src/decorators/user.decorator';
import {
	CreateExpenseDto,
	PartialExpenseDto,
} from 'src/expenses/dto/expense.dto';
import { ExpensesService } from 'src/expenses/expenses.service';
import { CreateFileDto } from 'src/files/dto/file.dto';
import { FilesService } from 'src/files/files.service';
import { IUser } from 'src/interfaces/user.interface';
import {
	CreateLeaseInvoiceDto,
	CreateManyLeaseInvoicesDto,
	PartialLeaseInvoiceDto,
} from 'src/lease-invoices/dto/lease-invoice.dto';
import { LeaseInvoicesService } from 'src/lease-invoices/lease-invoices.service';
import { CreateLeaseDto, PartialLeaseDto } from 'src/leases/dto/lease.dto';
import { LeasesService } from 'src/leases/leases.service';
import { CreatePayoutDto, PayoutDto } from 'src/payouts/dto/payout.dto';
import { PayoutsService } from 'src/payouts/payouts.service';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { CreatePortfolioDto } from 'src/portfolios/dto/portfolio.dto';
import { PortfoliosService } from 'src/portfolios/portfolios.service';
import { CreatePropertyDto } from 'src/properties/dto/property.dto';
import { PropertiesService } from 'src/properties/properties.service';
import { CreateTenantDto } from 'src/tenants/dto/tenant.dto';
import { TenantsService } from 'src/tenants/tenants.service';
import { CreateUnitDto, PartialUnitDto } from 'src/units/dto/unit.dto';
import { UnitsService } from 'src/units/units.service';

@Controller('organizations/:organizationId')
@ApiTags('organizations')
@SwaggerAuth()
export class OrganizationsAdminController {
	constructor(
		private readonly tenantsService: TenantsService,
		private readonly portfoliosService: PortfoliosService,
		private readonly propertiesService: PropertiesService,
		private readonly unitsService: UnitsService,
		private readonly leasesService: LeasesService,
		private readonly leaseInvoicesService: LeaseInvoicesService,
		private readonly expensesService: ExpensesService,
		private readonly payoutsService: PayoutsService,
		private readonly filesService: FilesService,
	) {}

	@Post('/tenants')
	@CheckAbilities({ action: Action.Create, subject: 'Tenant', useParams: true })
	createTenant(
		@Param('organizationId') organizationId: string,
		@Body(new ZodValidationPipe(tenantCreateSchema))
		createTenantDto: CreateTenantDto,
	) {
		return this.tenantsService.create({
			createTenantDto: createTenantDto,
			organizationId,
		});
	}

	@Post('/portfolios')
	@CheckAbilities({
		action: Action.Create,
		subject: 'Portfolio',
		useParams: true,
	})
	createPortfolio(
		@Param('organizationId') organizationId: string,
		@Body(new ZodValidationPipe(portfolioCreateSchema))
		createPortfolioDto: CreatePortfolioDto,
	) {
		return this.portfoliosService.create({
			createPortfolioDto: createPortfolioDto,
			organizationId,
		});
	}

	@Post('/properties')
	@CheckAbilities({
		action: Action.Create,
		subject: 'Property',
		useParams: true,
	})
	createProperty(
		@Param('organizationId') organizationId: string,
		@Body(new ZodValidationPipe(propertyCreateSchema))
		createPropertyDto: CreatePropertyDto,
	) {
		return this.propertiesService.create({
			createPropertyDto,
			organizationId,
		});
	}

	@Post('/units')
	@CheckAbilities({ action: Action.Create, subject: 'Unit', useParams: true })
	// TODO: review if PartialUnitDto is needed
	@ApiCreatedResponse({ type: PartialUnitDto })
	createUnit(
		@Param('organizationId') organizationId: string,
		@Body(new ZodValidationPipe(unitCreateSchema))
		createUnitDto: CreateUnitDto,
	): Promise<PartialUnitDto> {
		return this.unitsService.create({
			createUnitDto,
			organizationId,
		});
	}

	@Post('/leases')
	@CheckAbilities({ action: Action.Create, subject: 'Lease', useParams: true })
	@ApiCreatedResponse({ type: PartialLeaseDto })
	createLease(
		@Param('organizationId') organizationId: string,
		@Body(new ZodValidationPipe(leaseCreateSchema))
		createLeaseDto: CreateLeaseDto,
	): Promise<PartialLeaseDto> {
		return this.leasesService.create({
			createLeaseDto,
			organizationId,
		});
	}

	@Post('/leaseInvoices')
	@CheckAbilities({
		action: Action.Create,
		subject: 'LeaseInvoice',
		useParams: true,
	})
	@ApiCreatedResponse({ type: PartialLeaseInvoiceDto })
	createLeaseInvoice(
		@Param('organizationId') organizationId: string,
		@Body(new ZodValidationPipe(leaseInvoiceCreateSchema))
		createLeaseInvoiceDto: CreateLeaseInvoiceDto,
	): Promise<PartialLeaseInvoiceDto> {
		return this.leaseInvoicesService.create({
			createLeaseInvoiceDto,
			organizationId,
		});
	}

	@Post('/lease/:id/leaseInvoices')
	@CheckAbilities({
		action: Action.Create,
		subject: 'LeaseInvoice',
		useParams: true,
	})
	@ApiBody({ type: CreateManyLeaseInvoicesDto, isArray: true })
	@ApiCreatedResponse({ type: String })
	createInvoices(
		@Param('organizationId') organizationId: string,
		@Param('id') id: string,
		@Body(new ZodValidationPipe(leaseInvoiceCreateManySchema))
		createManyLeaseInvoicesDto: CreateManyLeaseInvoicesDto[],
	): Promise<string> {
		return this.leasesService.createInvoices({
			leaseId: id,
			createManyLeaseInvoicesDto,
			organizationId,
		});
	}

	@Post('/expenses')
	@CheckAbilities({
		action: Action.Create,
		subject: 'Expense',
		useParams: true,
	})
	@ApiCreatedResponse({ type: PartialExpenseDto })
	createExpense(
		@User() user: IUser,
		@Param('organizationId') organizationId: string,
		@Body(new ZodValidationPipe(expenseCreateSchema))
		createExpenseDto: CreateExpenseDto,
	): Promise<PartialExpenseDto> {
		return this.expensesService.create({
			createExpenseDto,
			organizationId,
			user,
		});
	}

	@Post('/payouts')
	@CheckAbilities({ action: Action.Create, subject: 'Payout', useParams: true })
	createPayout(
		@Param('organizationId') organizationId: string,
		@Body(new ZodValidationPipe(payoutCreateSchema))
		createPayoutDto: CreatePayoutDto,
	): Promise<PayoutDto> {
		return this.payoutsService.create({ createPayoutDto, organizationId });
	}

	@Post('/files')
	@CheckAbilities({ action: Action.Create, subject: 'File', useParams: true })
	@ApiCreatedResponse({ type: String })
	@UseInterceptors(FileInterceptor('file'))
	@ApiConsumes('multipart/form-data')
	@ApiBody({ type: CreateFileDto })
	create(
		@Param('organizationId') organizationId: string,
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					// NOTE: keep in sync with BODY_SIZE_LIMIT env var (sveltekit's node adapter)
					// It is set in site/Dockerfile and site/package.json (preview:node script)
					new MaxFileSizeValidator({ maxSize: 100 * 1000 * 1000 }),
				],
			}),
		)
		file: Express.Multer.File,
		@Body(new ZodValidationPipe(fileCreateSchema.omit({ file: true })))
		createFileDto: Omit<CreateFileDto, 'file'>,
	): Promise<string> {
		return this.filesService.create({ file, createFileDto, organizationId });
	}
}
