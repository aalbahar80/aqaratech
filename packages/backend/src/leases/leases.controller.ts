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
	ApiBody,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiQuery,
	ApiTags,
} from '@nestjs/swagger';
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
import {
	CreateManyLeaseInvoicesDto,
	LeaseInvoiceDto,
} from 'src/lease-invoices/dto/lease-invoice.dto';
import { LeaseInvoicesService } from 'src/lease-invoices/lease-invoices.service';
import {
	CreateLeaseDto,
	LeaseDto,
	PartialLeaseDto,
	UpdateLeaseDto,
} from 'src/leases/dto/lease.dto';
import { LeasesService } from './leases.service';

const SubjectType = 'Lease';

@Controller('leases')
@ApiTags('leases')
@SwaggerAuth()
export class LeasesController {
	constructor(
		private readonly leasesService: LeasesService,
		private readonly leaseInvoicesService: LeaseInvoicesService,
	) {}

	@Post()
	@CheckAbilities({ action: Action.Create, subject: SubjectType })
	@ApiCreatedResponse({ type: PartialLeaseDto })
	create(
		@User() user: IUser,
		@Body() createLeaseDto: CreateLeaseDto,
	): Promise<PartialLeaseDto> {
		return this.leasesService.create({ createLeaseDto, user });
	}

	@Get()
	@CheckAbilities({ action: Action.Read, subject: SubjectType })
	@ApiPaginatedResponse(LeaseDto)
	@ApiQuery({
		name: 'orderBy',
		enum: Prisma.LeaseScalarFieldEnum,
		required: false,
	})
	findAll(
		@User() user: IUser,
		@Query() pageOptionsDto: PageOptionsDto,
	): Promise<WithCount<LeaseDto>> {
		return this.leasesService.findAll({ pageOptionsDto, user });
	}

	@Get(':id')
	@CheckAbilities({ action: Action.Read, subject: SubjectType })
	@ApiOkResponse({ type: LeaseDto })
	findOne(@Param('id') id: string): Promise<LeaseDto> {
		return this.leasesService.findOne({ id });
	}

	@Patch(':id')
	@CheckAbilities({ action: Action.Update, subject: SubjectType })
	@ApiOkResponse({ type: PartialLeaseDto })
	update(
		@User() user: IUser,
		@Param('id') id: string,
		@Body() updateLeaseDto: UpdateLeaseDto,
	): Promise<PartialLeaseDto> {
		return this.leasesService.update({ id, updateLeaseDto, user });
	}

	@Delete(':id')
	@CheckAbilities({ action: Action.Delete, subject: SubjectType })
	@ApiOkResponse({ type: String })
	remove(@Param('id') id: string): Promise<string> {
		return this.leasesService.remove({ id });
	}

	@Get('/:id/invoices')
	@CheckAbilities(
		{ action: Action.Read, subject: SubjectType },
		{ action: Action.Read, subject: 'LeaseInvoice' },
	)
	@ApiPaginatedResponse(LeaseInvoiceDto)
	findInvoices(
		@User() user: IUser,
		@Param('id') id: string,
		@Query() pageOptionsDto: LeaseInvoiceOptionsDto,
	): Promise<WithCount<LeaseInvoiceDto>> {
		const where: Prisma.LeaseInvoiceWhereInput = { leaseId: { equals: id } };
		return this.leaseInvoicesService.findAll({ user, pageOptionsDto, where });
	}

	@Post('/:id/invoices')
	@CheckAbilities(
		{ action: Action.Update, subject: SubjectType },
		{ action: Action.Update, subject: 'LeaseInvoice' },
	)
	@ApiBody({ type: CreateManyLeaseInvoicesDto, isArray: true })
	@ApiCreatedResponse({ type: String })
	createInvoices(
		@Param('id') id: string,
		@Body() createManyLeaseInvoicesDto: CreateManyLeaseInvoicesDto[],
	): Promise<string> {
		return this.leasesService.createInvoices({
			leaseId: id,
			createManyLeaseInvoicesDto,
		});
	}
}
