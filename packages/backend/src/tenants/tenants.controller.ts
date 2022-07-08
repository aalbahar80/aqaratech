import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { Action } from 'src/casl/casl-ability.factory';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { WithCount } from 'src/common/dto/paginated.dto';
import { ROLE_HEADER_NAME } from 'src/constants/header-role';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { User } from 'src/decorators/user.decorator';

import { IUser } from 'src/interfaces/user.interface';
import { LeaseInvoiceDto } from 'src/lease-invoices/dto/lease-invoice.dto';
import { LeaseInvoicesService } from 'src/lease-invoices/lease-invoices.service';
import { LeaseDto } from 'src/leases/dto/lease.dto';
import { LeasesService } from 'src/leases/leases.service';
import { TenantPageOptionsDto } from 'src/tenants/dto/tenant-page-options.dto';
import {
  TenantDto,
  TenantOneDto,
  UpdateTenantDto,
} from 'src/tenants/dto/tenant.dto';
import { TenantsService } from './tenants.service';

@Controller('tenants')
@ApiTags('tenants')
@SwaggerAuth()
export class TenantsController {
  constructor(
    private readonly tenantsService: TenantsService,
    private readonly leasesService: LeasesService,
    private readonly leaseInvoicesService: LeaseInvoicesService,
  ) {}

  @Post()
  @CheckAbilities({ action: Action.Create, subject: 'Tenant' })
  @ApiHeader({ name: ROLE_HEADER_NAME })
  @ApiCreatedResponse({ type: TenantDto })
  create(
    @User() user: IUser,
    @Body() createTenantDto: TenantDto,
  ): Promise<TenantDto> {
    return this.tenantsService.create({ createTenantDto, user });
  }

  @Get()
  @CheckAbilities({ action: Action.Read, subject: 'Tenant' })
  @ApiPaginatedResponse(TenantDto)
  findAll(
    @User() user: IUser,
    @Query() tenantPageOptionsDto: TenantPageOptionsDto,
  ): Promise<WithCount<TenantDto>> {
    return this.tenantsService.findAll({ tenantPageOptionsDto, user });
  }

  @Get(':id')
  @CheckAbilities({ action: Action.Read, subject: 'Tenant' })
  @ApiOkResponse({ type: TenantOneDto })
  findOne(@Param('id') id: string): Promise<TenantOneDto> {
    return this.tenantsService.findOne({ id });
  }

  @Patch(':id')
  @CheckAbilities({ action: Action.Update, subject: 'Tenant' })
  @ApiOkResponse({ type: TenantDto })
  update(
    @User() user: IUser,
    @Param('id') id: string,
    @Body() updateTenantDto: UpdateTenantDto,
  ): Promise<TenantDto> {
    return this.tenantsService.update({ id, updateTenantDto, user });
  }

  @Delete(':id')
  @CheckAbilities({ action: Action.Delete, subject: 'Tenant' })
  @ApiOkResponse({ type: TenantDto })
  remove(@Param('id') id: string): Promise<TenantDto> {
    return this.tenantsService.remove({ id });
  }

  @Get(':id/leases')
  @CheckAbilities({ action: Action.Read, subject: 'Tenant' })
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
  @CheckAbilities({ action: Action.Read, subject: 'Tenant' })
  @ApiPaginatedResponse(LeaseInvoiceDto)
  findInvoices(
    @User() user: IUser,
    @Query() pageOptionsDto: PageOptionsDto,
    @Param('id') id: string,
  ): Promise<WithCount<LeaseInvoiceDto>> {
    const where: Prisma.LeaseInvoiceWhereInput = {
      lease: { tenantId: { equals: id } },
    };
    return this.leaseInvoicesService.findAll({ user, pageOptionsDto, where });
  }
}
