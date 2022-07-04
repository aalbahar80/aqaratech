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
import { PaginatedMetaDto } from 'src/common/dto/paginated.dto';
import { ROLE_HEADER_NAME } from 'src/constants/header-role';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { User } from 'src/decorators/user.decorator';

import { IUser } from 'src/interfaces/user.interface';
import { LeaseInvoiceDto } from 'src/lease-invoices/dto/lease-invoice.dto';
import { LeaseInvoicesService } from 'src/lease-invoices/lease-invoices.service';
import {
  CreateLeaseDto,
  LeaseBasicDto,
  LeaseDto,
  UpdateLeaseDto,
} from 'src/leases/dto/lease.dto';
import { LeasesService } from './leases.service';

@Controller('leases')
@ApiTags('leases')
@SwaggerAuth()
export class LeasesController {
  constructor(
    private readonly leasesService: LeasesService,
    private readonly leaseInvoicesService: LeaseInvoicesService,
  ) {}

  @Post()
  @CheckAbilities({ action: Action.Create, subject: 'Lease' })
  @ApiHeader({ name: ROLE_HEADER_NAME })
  @ApiCreatedResponse({ type: LeaseBasicDto })
  create(
    @User() user: IUser,
    @Body() createLeaseDto: CreateLeaseDto,
  ): Promise<LeaseBasicDto> {
    return this.leasesService.create({ createLeaseDto, user });
  }

  @Get()
  @CheckAbilities({ action: Action.Read, subject: 'Lease' })
  @ApiPaginatedResponse(LeaseDto)
  findAll(
    @User() user: IUser,
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PaginatedMetaDto<LeaseDto>> {
    return this.leasesService.findAll({ pageOptionsDto, user });
  }

  @Get(':id')
  @CheckAbilities({ action: Action.Read, subject: 'Lease' })
  @ApiOkResponse({ type: LeaseDto })
  findOne(@Param('id') id: string): Promise<LeaseDto> {
    return this.leasesService.findOne({ id });
  }

  @Patch(':id')
  @CheckAbilities({ action: Action.Update, subject: 'Lease' })
  @ApiOkResponse({ type: LeaseBasicDto })
  update(
    @User() user: IUser,
    @Param('id') id: string,
    @Body() updateLeaseDto: UpdateLeaseDto,
  ): Promise<LeaseBasicDto> {
    return this.leasesService.update({ id, updateLeaseDto, user });
  }

  @Delete(':id')
  @CheckAbilities({ action: Action.Delete, subject: 'Lease' })
  @ApiOkResponse({ type: LeaseBasicDto })
  remove(@Param('id') id: string): Promise<LeaseBasicDto> {
    return this.leasesService.remove({ id });
  }

  @Get('/:id/invoices')
  @CheckAbilities({ action: Action.Read, subject: 'Lease' })
  @ApiPaginatedResponse(LeaseInvoiceDto)
  findInvoices(
    @User() user: IUser,
    @Param('id') id: string,
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PaginatedMetaDto<LeaseInvoiceDto>> {
    const where: Prisma.LeaseInvoiceWhereInput = { leaseId: { equals: id } };
    return this.leaseInvoicesService.findAll({ user, pageOptionsDto, where });
  }
}
