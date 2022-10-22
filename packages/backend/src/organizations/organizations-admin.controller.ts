import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import {
	leaseCreateSchema,
	portfolioCreateSchema,
	propertyCreateSchema,
	tenantCreateSchema,
	unitCreateSchema,
} from '@self/utils';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { Action } from 'src/casl/action.enum';
import { AuthzGuard } from 'src/casl/authz.guard';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { CreateLeaseDto, PartialLeaseDto } from 'src/leases/dto/lease.dto';
import { LeasesService } from 'src/leases/leases.service';
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
@UseGuards(AuthzGuard)
export class OrganizationsAdminController {
	constructor(
		private readonly tenantsService: TenantsService,
		private readonly portfoliosService: PortfoliosService,
		private readonly propertiesService: PropertiesService,
		private readonly unitsService: UnitsService,
		private readonly leasesService: LeasesService,
	) {}

	@Post('/tenants')
	@CheckAbilities({ action: Action.Create, subject: 'Tenant' })
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
	@CheckAbilities({ action: Action.Create, subject: 'Portfolio' })
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
	@CheckAbilities({ action: Action.Create, subject: 'Property' })
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
	@CheckAbilities({ action: Action.Create, subject: 'Unit' })
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
	@CheckAbilities({ action: Action.Create, subject: 'Lease' })
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
}
