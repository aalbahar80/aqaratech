import {
	Body,
	Controller,
	Delete,
	ForbiddenException,
	Get,
	NotFoundException,
	Param,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import {
	ApiCreatedResponse,
	ApiExcludeEndpoint,
	ApiOkResponse,
	ApiTags,
} from '@nestjs/swagger';
import { Prisma, RoleType } from '@prisma/client';

import { organizationSchema } from '@self/utils';
import { SkipRoleGuard } from 'src/auth/public.decorator';
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
import { UserBasic } from 'src/decorators/user-basic.decorator';
import { User } from 'src/decorators/user.decorator';
import { EnvService } from 'src/env/env.service';
import { AuthenticatedUser, IUser } from 'src/interfaces/user.interface';
import { LeaseInvoiceDto } from 'src/lease-invoices/dto/lease-invoice.dto';
import { LeaseInvoicesService } from 'src/lease-invoices/lease-invoices.service';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { RoleDto } from 'src/roles/dto/role.dto';
import { RolesService } from 'src/roles/roles.service';
import { SearchDto } from 'src/search/dto/search.dto';
import { SearchService } from 'src/search/search.service';
import { escapeStringRegexp } from 'src/utils/regex';

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
		private readonly leaseInvoicesService: LeaseInvoicesService,
		private readonly env: EnvService,
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
	// The service always takes the user's permissions into account for the search,
	// but we check here if the user is allowed to search at all to avoid unnecessary
	// database queries.
	// @CheckAbilities({
	// 	action: Action.Manage,
	// 	subject: SubjectType,
	// 	useParams: true,
	// 	overrideParams: {
	// 		organizationId: 'id',
	// 	},
	// })
	search(
		@User() user: IUser,
		@Param('organizationId') organizationId: string,
		@Query('query') query: string,
	): Promise<SearchDto> {
		const SEARCH_ROLES: RoleType[] = ['ORGADMIN', 'PORTFOLIO'];
		// TODO: move authz logic to casl, reinstate @CheckAbilities
		if (
			user.role.organizationId !== organizationId ||
			!SEARCH_ROLES.includes(user.role.roleType)
		) {
			throw new ForbiddenException();
		}

		return this.searchService.search({
			// Safely escape the query string
			query: escapeStringRegexp(query),
			user,
		});
	}

	@Get(':id/leaseInvoices')
	@CheckAbilities({ action: Action.Read, subject: SubjectType })
	@ApiQueryOptions()
	@ApiPaginatedResponse(LeaseInvoiceDto)
	findAllLeaseInvoices(
		@User() user: IUser,
		@Param('id') organizationId: string,
		@QueryParser({
			parserOptions: { orderDefaultValue: 'postAt' },
			filterOptions: { keys: ['postAt', 'lease', 'isPaid', 'mfPaymentId'] },
		})
		queryOptions: QueryOptionsDto,
	): Promise<WithCount<LeaseInvoiceDto>> {
		return this.leaseInvoicesService.findAll({
			queryOptions,
			user,
			whereCustom: { organizationId },
		});
	}

	/** Report usage of the API */
	@Post(':id/report')
	@ApiExcludeEndpoint()
	report(@Param('id') organizationId: string) {
		// Rely on cron job in production
		if (this.env.e.PUBLIC_AQARATECH_ENV === 'production') {
			throw new NotFoundException();
		}

		return this.organizationsService.reportUsageAll({
			id: organizationId,
		});
	}

	/** Trigger a refresh of the subscription status of an organization. */
	@Post(':id/status-refresh')
	@CheckAbilities({
		action: Action.Read,
		subject: SubjectType,
		useParams: false,
	})
	async statusRefresh(@Param('id') organizationId: string): Promise<void> {
		return await this.organizationsService.refreshActiveStatus({
			id: organizationId,
		});
	}
}
