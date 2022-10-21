import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { tenantCreateSchema } from '@self/utils';
import { SkipAbilityCheck } from 'src/auth/public.decorator';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { Action } from 'src/casl/action.enum';
import { AqaratechStaffGuard } from 'src/casl/aqaratech-staff.guard';
import { AuthzGuard } from 'src/casl/authz.guard';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { WithCount } from 'src/common/dto/paginated.dto';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { UserBasic } from 'src/decorators/user-basic.decorator';
import { User } from 'src/decorators/user.decorator';
import { AuthenticatedUser, IUser } from 'src/interfaces/user.interface';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { RoleDto } from 'src/roles/dto/role.dto';
import { RolesService } from 'src/roles/roles.service';
import { SearchDto } from 'src/search/dto/search.dto';
import { SearchService } from 'src/search/search.service';
import { CreateTenantZodDto } from 'src/tenants/dto/tenant-zod.dto';
import { TenantsService } from 'src/tenants/tenants.service';
import {
	CreateOrganizationDto,
	OrganizationCreatedDto,
	OrganizationDto,
	UpdateOrganizationDto,
} from './dto/organization.dto';
import { OrganizationsService } from './organizations.service';

const SubjectType = 'Organization';

@Controller('organizations')
@ApiTags('organizations')
@SwaggerAuth()
export class OrganizationsController {
	constructor(
		private readonly organizationsService: OrganizationsService,
		private rolesService: RolesService,
		private readonly searchService: SearchService,
		private readonly tenantsService: TenantsService,
	) {}

	@Post()
	// No need to check abilities here. Any authenticated user can create an organization.
	@SkipAbilityCheck()
	@ApiCreatedResponse({ type: OrganizationCreatedDto })
	create(
		@UserBasic() user: AuthenticatedUser,
		@Body() createOrganizationDto: CreateOrganizationDto,
	): Promise<OrganizationCreatedDto> {
		// also returns the roleId for the created organization admin
		return this.organizationsService.create({ createOrganizationDto, user });
	}

	@Get()
	@SkipAbilityCheck()
	@UseGuards(AqaratechStaffGuard)
	@ApiPaginatedResponse(OrganizationDto)
	findAll(): Promise<WithCount<OrganizationDto>> {
		return this.organizationsService.findAll();
	}

	@Get(':id')
	@CheckAbilities({ action: Action.Read, subject: SubjectType })
	@ApiOkResponse({ type: OrganizationDto })
	findOne(
		@User() user: IUser,
		@Param('id') id: string,
	): Promise<OrganizationDto> {
		return this.organizationsService.findOne({ id, user });
	}

	@Patch(':id')
	@CheckAbilities({ action: Action.Update, subject: SubjectType })
	@ApiOkResponse({ type: String })
	update(
		@User() user: IUser,
		@Param('id') id: string,
		@Body() updateOrganizationDto: UpdateOrganizationDto,
	): Promise<string> {
		return this.organizationsService.update({
			id,
			updateOrganizationDto,
			user,
		});
	}

	@Delete(':id')
	@CheckAbilities({ action: Action.Delete, subject: SubjectType })
	@ApiOkResponse({ type: OrganizationDto })
	remove(
		@User() user: IUser,
		@Param('id') id: string,
	): Promise<OrganizationDto> {
		return this.organizationsService.remove({ id, user });
	}

	// ### ROLES ###

	@Get(':id/roles')
	@CheckAbilities(
		{ action: Action.Read, subject: SubjectType },
		{ action: Action.Read, subject: 'Role' },
	)
	@ApiPaginatedResponse(RoleDto)
	findRoles(
		@User() user: IUser,
		@Query() pageOptionsDto: PageOptionsDto,
		@Param('id') id: string,
	): Promise<WithCount<RoleDto>> {
		const where: Prisma.RoleWhereInput = {
			organizationId: id,
			roleType: 'ORGADMIN',
		};
		return this.rolesService.findAll({ user, pageOptionsDto, where });
	}

	@Get(':id/search')
	@CheckAbilities({ action: Action.Manage, subject: SubjectType })
	@ApiOkResponse({ type: SearchDto, isArray: true })
	search(
		@User() user: IUser,
		@Param('id') id: string,
		@Query('query') query: string,
	): Promise<SearchDto[]> {
		return this.searchService.search({ query, organizationId: id, user });
	}

	@Post('/:organizationId/tenants')
	@UseGuards(AuthzGuard)
	@CheckAbilities({ action: Action.Create, subject: 'Tenant' })
	createTenant(
		@Param('organizationId') organizationId: string,
		@Body(new ZodValidationPipe(tenantCreateSchema))
		createTenantZodDto: CreateTenantZodDto,
	) {
		return this.tenantsService.create({
			createTenantDto: createTenantZodDto,
			organizationId,
		});
	}
}
