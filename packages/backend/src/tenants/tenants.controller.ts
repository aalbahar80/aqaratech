import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { Action } from 'src/casl/action.enum';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { WithCount } from 'src/common/dto/paginated.dto';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { User } from 'src/decorators/user.decorator';

import { IUser } from 'src/interfaces/user.interface';
import { LeaseInvoiceOptionsDto } from 'src/lease-invoices/dto/lease-invoice-options.dto';
import { LeaseInvoiceDto } from 'src/lease-invoices/dto/lease-invoice.dto';
import { LeaseInvoicesService } from 'src/lease-invoices/lease-invoices.service';
import { LeaseDto } from 'src/leases/dto/lease.dto';
import { LeasesService } from 'src/leases/leases.service';
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
	findAll(
		@User() user: IUser,
		@Query() pageOptionsDto: PageOptionsDto,
	): Promise<WithCount<TenantDto>> {
		return this.tenantsService.findAll({ pageOptionsDto, user });
	}

	@Get(':id')
	@CheckAbilities({ action: Action.Read, subject: SubjectType })
	@ApiOkResponse({ type: TenantDto })
	findOne(@Param('id') id: string): Promise<TenantDto> {
		return this.tenantsService.findOne({ id });
	}

	@Patch(':id')
	@CheckAbilities({ action: Action.Update, subject: SubjectType })
	@ApiOkResponse({ type: TenantDto })
	update(
		@User() user: IUser,
		@Param('id') id: string,
		@Body() updateTenantDto: UpdateTenantDto,
	): Promise<TenantDto> {
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
	@ApiPaginatedResponse(LeaseDto)
	findLeases(
		@User() user: IUser,
		@Query() pageOptionsDto: PageOptionsDto, // TODO change to leasepageoptionsdto?
		@Param('id') id: string,
	): Promise<WithCount<LeaseDto>> {
		const where: Prisma.LeaseWhereInput = { tenantId: { equals: id } };
		return this.leasesService.findAll({ user, pageOptionsDto, where });
	}

	@Get(':id/invoices')
	@CheckAbilities(
		{ action: Action.Read, subject: SubjectType },
		{ action: Action.Read, subject: 'LeaseInvoice' },
	)
	@ApiPaginatedResponse(LeaseInvoiceDto)
	findInvoices(
		@User() user: IUser,
		@Query() pageOptionsDto: LeaseInvoiceOptionsDto,
		@Param('id') id: string,
	): Promise<WithCount<LeaseInvoiceDto>> {
		const where: Prisma.LeaseInvoiceWhereInput = {
			lease: { tenantId: { equals: id } },
		};
		return this.leaseInvoicesService.findAll({ user, pageOptionsDto, where });
	}

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
		const where: Prisma.RoleWhereInput = { tenantId: id, roleType: 'TENANT' };
		return this.rolesService.findAll({ user, pageOptionsDto, where });
	}
}
