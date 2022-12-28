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

import { organizationSchema } from '@self/utils';

import { SkipRoleGuard } from 'src/auth/public.decorator';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { Action } from 'src/casl/action.enum';
import { AqaratechStaffGuard } from 'src/casl/aqaratech-staff.guard';
import { WithCount } from 'src/common/dto/paginated.dto';
import { QueryOptionsDto } from 'src/common/dto/query-options.dto';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response';
import {
	ApiQueryOptions,
	QueryParser,
} from 'src/decorators/query-options.decorator';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { UserBasic } from 'src/decorators/user-basic.decorator';
import { User } from 'src/decorators/user.decorator';
import { AuthenticatedUser, IUser } from 'src/interfaces/user.interface';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { RoleDto } from 'src/roles/dto/role.dto';
import { RolesService } from 'src/roles/roles.service';
import { SearchDto } from 'src/search/dto/search.dto';
import { SearchService } from 'src/search/search.service';

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
		private readonly rolesService: RolesService,
		private readonly searchService: SearchService,
	) {}

	@Post()
	// No need to check abilities here. Any authenticated user can create an organization.
	@SkipRoleGuard()
	@ApiCreatedResponse({ type: OrganizationCreatedDto })
	create(
		@UserBasic() user: AuthenticatedUser,
		@Body(new ZodValidationPipe(organizationSchema))
		createOrganizationDto: CreateOrganizationDto,
	): Promise<OrganizationCreatedDto> {
		// also returns the roleId for the created organization admin
		return this.organizationsService.create({
			createOrganizationDto,
			user,
		});
	}

	@Get()
	@UseGuards(AqaratechStaffGuard)
	@ApiPaginatedResponse(OrganizationDto)
	findAll(): Promise<WithCount<OrganizationDto>> {
		return this.organizationsService.findAll();
	}

	@Get(':id')
	@CheckAbilities({
		action: Action.Read,
		subject: SubjectType,
		useParams: true,
	})
	@ApiOkResponse({ type: OrganizationDto })
	findOne(
		@User() user: IUser,
		@Param('id') id: string,
	): Promise<OrganizationDto> {
		return this.organizationsService.findOne({ id, user });
	}

	@Patch(':id')
	@CheckAbilities({
		action: Action.Update,
		subject: SubjectType,
		useParams: true,
	})
	update(
		@User() user: IUser,
		@Param('id') id: string,
		@Body(new ZodValidationPipe(organizationSchema))
		updateOrganizationDto: UpdateOrganizationDto,
	) {
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
	@ApiQueryOptions()
	@ApiPaginatedResponse(RoleDto)
	findRoles(
		@User() user: IUser,
		@QueryParser() queryOptions: QueryOptionsDto,
		@Param('id') id: string,
	): Promise<WithCount<RoleDto>> {
		const where: Prisma.RoleWhereInput = {
			organizationId: id,
			roleType: 'ORGADMIN',
		};
		return this.rolesService.findAll({ user, queryOptions, where });
	}

	@Get(':organizationId/search')
	@CheckAbilities({
		action: Action.Manage,
		subject: SubjectType,
		useParams: true,
		overrideParams: {
			organizationId: 'id',
		},
	})
	@ApiOkResponse({ type: SearchDto, isArray: true })
	search(
		@User() user: IUser,
		@Param('organizationId') organizationId: string,
		@Query('query') query: string,
	): Promise<SearchDto> {
		// TODO:Check return type exists in openapi
		return this.searchService.search({ query, organizationId, user });
	}
}
