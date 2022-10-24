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
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { Action } from 'src/casl/action.enum';
import { WithCount } from 'src/common/dto/paginated.dto';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { User } from 'src/decorators/user.decorator';

import { IUser } from 'src/interfaces/user.interface';
import { LeaseInvoiceOptionsDto } from 'src/lease-invoices/dto/lease-invoice-options.dto';
import {
	LeaseInvoiceDto,
	PartialLeaseInvoiceDto,
	UpdateLeaseInvoiceDto,
} from 'src/lease-invoices/dto/lease-invoice.dto';
import { LeaseInvoicesService } from './lease-invoices.service';

const SubjectType = 'LeaseInvoice';

@Controller('leaseInvoices')
@ApiTags('leaseInvoices')
@SwaggerAuth()
export class LeaseInvoicesController {
	constructor(private readonly leaseInvoicesService: LeaseInvoicesService) {}

	@Get()
	@CheckAbilities({ action: Action.Read, subject: SubjectType })
	@ApiPaginatedResponse(LeaseInvoiceDto)
	findAll(
		@User() user: IUser,
		@Query() pageOptionsDto: LeaseInvoiceOptionsDto,
	): Promise<WithCount<LeaseInvoiceDto>> {
		return this.leaseInvoicesService.findAll({ pageOptionsDto, user });
	}

	@Get(':id')
	@CheckAbilities({ action: Action.Read, subject: SubjectType })
	@ApiOkResponse({ type: LeaseInvoiceDto })
	findOne(
		@Param('id') id: string,
		@User() user: IUser,
	): Promise<LeaseInvoiceDto> {
		return this.leaseInvoicesService.findOne({ id, user });
	}

	@Patch(':id')
	@CheckAbilities({ action: Action.Update, subject: SubjectType })
	@ApiOkResponse({ type: PartialLeaseInvoiceDto })
	update(
		@User() user: IUser,
		@Param('id') id: string,
		@Body() updateLeaseInvoiceDto: UpdateLeaseInvoiceDto,
	): Promise<PartialLeaseInvoiceDto> {
		return this.leaseInvoicesService.update({
			id,
			updateLeaseInvoiceDto,
			user,
		});
	}

	@Delete(':id')
	@CheckAbilities({ action: Action.Delete, subject: SubjectType })
	@ApiOkResponse({ type: String })
	remove(@Param('id') id: string, @User() user: IUser): Promise<string> {
		return this.leaseInvoicesService.remove({ id, user });
	}

	@Post('/:id/send-email')
	@CheckAbilities({ action: Action.Update, subject: SubjectType })
	@ApiCreatedResponse({ type: String })
	sendEmail(@Param('id') id: string, @User() user: IUser): Promise<string> {
		return this.leaseInvoicesService.sendInvoice({ id, user });
	}
}
