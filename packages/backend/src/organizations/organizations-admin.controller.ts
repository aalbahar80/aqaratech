import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { tenantCreateSchema } from '@self/utils';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { Action } from 'src/casl/action.enum';
import { AuthzGuard } from 'src/casl/authz.guard';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { CreateTenantDto } from 'src/tenants/dto/tenant.dto';
import { TenantsService } from 'src/tenants/tenants.service';

@Controller('organizations/:organizationId')
@ApiTags('organizations')
@SwaggerAuth()
@UseGuards(AuthzGuard)
export class OrganizationsAdminController {
	constructor(private readonly tenantsService: TenantsService) {}

	@Post('/tenants')
	@CheckAbilities({ action: Action.Create, subject: 'Tenant' })
	createTenant(
		@Param('organizationId') organizationId: string,
		@Body(new ZodValidationPipe(tenantCreateSchema))
		CreateTenantDto: CreateTenantDto,
	) {
		return this.tenantsService.create({
			createTenantDto: CreateTenantDto,
			organizationId,
		});
	}
}
