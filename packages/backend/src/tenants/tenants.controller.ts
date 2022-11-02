import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { tenantUpdateSchema } from '@self/utils';
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

import { IUser } from 'src/interfaces/user.interface';
import { LeaseInvoiceDto } from 'src/lease-invoices/dto/lease-invoice.dto';
import { LeaseInvoicesService } from 'src/lease-invoices/lease-invoices.service';
import { LeaseDto } from 'src/leases/dto/lease.dto';
import { LeasesService } from 'src/leases/leases.service';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { RoleDto } from 'src/roles/dto/role.dto';
import { RolesService } from 'src/roles/roles.service';
import { TenantDto, UpdateTenantDto } from 'src/tenants/dto/tenant.dto';
import { TenantsService } from './tenants.service';

const SubjectType = 'Tenant';

@Controller('tenants')
@ApiTags('tenants')
@SwaggerAuth()
export class TenantsController {
	constructor(
		private readonly tenantsService: TenantsService,
		private readonly leasesService: LeasesService,
		private readonly leaseInvoicesService: LeaseInvoicesService,
		private readonly rolesService: RolesService,
	) {}

	@Get()
	@CheckAbilities({ action: Action.Read, subject: SubjectType })
	@ApiPaginatedResponse(TenantDto)
	@ApiQueryOptions()
	findAll(
		@User() user: IUser,
		@QueryParser() queryOptions: QueryOptionsDto,
	): Promise<WithCount<TenantDto>> {
		return this.tenantsService.findAll({ queryOptions, user });
	}

	@Get(':id')
	@CheckAbilities({ action: Action.Read, subject: SubjectType })
	@ApiOkResponse({ type: TenantDto })
	findOne(@Param('id') id: string): Promise<TenantDto> {
		return this.tenantsService.findOne({ id });
	}

	@Patch(':id')
	@SkipAbilityCheck() // TODO rm
	update(
		@User() user: IUser,
		@Param('id') id: string,
		@Body(new ZodValidationPipe(tenantUpdateSchema))
		updateTenantDto: UpdateTenantDto,
	) {
		return this.tenantsService.update({ id, updateTenantDto, user });
	}

	@Delete(':id')
	@CheckAbilities({ action: Action.Delete, subject: SubjectType })
	@ApiOkResponse({ type: String })
	remove(@User() user: IUser, @Param('id') id: string): Promise<TenantDto> {
		return this.tenantsService.remove({ id, user });
	}

	@Get(':id/leases')
	@CheckAbilities(
		{ action: Action.Read, subject: SubjectType },
		{ action: Action.Read, subject: 'Lease' },
	)
	@ApiQueryOptions()
	@ApiPaginatedResponse(LeaseDto)
	findLeases(
		@User() user: IUser,
		@QueryParser() queryOptions: QueryOptionsDto, // TODO change to leasequeryOptions?
		@Param('id') id: string,
	): Promise<WithCount<LeaseDto>> {
		const where: Prisma.LeaseWhereInput = { tenantId: { equals: id } };
		return this.leasesService.findAll({ user, queryOptions, where });
	}

	@Get(':id/leaseInvoices')
	@CheckAbilities(
		{ action: Action.Read, subject: SubjectType },
		{ action: Action.Read, subject: 'LeaseInvoice' },
	)
	@ApiQueryOptions()
	@ApiPaginatedResponse(LeaseInvoiceDto)
	findInvoices(
		@User() user: IUser,
		@Param('id') id: string,
		@QueryParser({
			parserOptions: { orderDefaultValue: 'postAt' },
		})
		queryOptions: QueryOptionsDto,
	): Promise<WithCount<LeaseInvoiceDto>> {
		const where: Prisma.LeaseInvoiceWhereInput = {
			lease: { tenantId: { equals: id } },
		};
		return this.leaseInvoicesService.findAll({ user, queryOptions, where });
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
		const where: Prisma.RoleWhereInput = { tenantId: id, roleType: 'TENANT' };
		return this.rolesService.findAll({ user, queryOptions, where });
	}
}
