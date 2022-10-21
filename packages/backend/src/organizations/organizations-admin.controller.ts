import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { propertyCreateSchema, tenantCreateSchema } from '@self/utils';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { Action } from 'src/casl/action.enum';
import { AuthzGuard } from 'src/casl/authz.guard';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { CreatePropertyDto } from 'src/properties/dto/property.dto';
import { PropertiesService } from 'src/properties/properties.service';
import { CreateTenantDto } from 'src/tenants/dto/tenant.dto';
import { TenantsService } from 'src/tenants/tenants.service';

@Controller('organizations/:organizationId')
@ApiTags('organizations')
@SwaggerAuth()
@UseGuards(AuthzGuard)
export class OrganizationsAdminController {
	constructor(
		private readonly tenantsService: TenantsService,
		private readonly propertiesService: PropertiesService,
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
}
