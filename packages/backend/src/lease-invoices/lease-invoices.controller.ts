import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	Redirect,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { getRoute, leaseInvoiceUpdateSchema, PageType } from '@self/utils';
import { Public } from 'src/auth/public.decorator';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { Action } from 'src/casl/action.enum';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { User } from 'src/decorators/user.decorator';
import { EnvService } from 'src/env/env.service';
import { IUser } from 'src/interfaces/user.interface';
import {
	LeaseInvoiceDto,
	PartialLeaseInvoiceDto,
	UpdateLeaseInvoiceDto,
} from 'src/lease-invoices/dto/lease-invoice.dto';
import { MYFATOORAH_CALLBACK_ENDPOINT } from 'src/myfatoorah/myfatoorah-callback.const';
import { MyfatoorahService } from 'src/myfatoorah/myfatoorah.service';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';

import { LeaseInvoicesService } from './lease-invoices.service';

const SubjectType = 'LeaseInvoice';

@Controller('leaseInvoices')
@ApiTags('leaseInvoices')
@SwaggerAuth()
export class LeaseInvoicesController {
	constructor(
		private readonly leaseInvoicesService: LeaseInvoicesService,
		private readonly myfatoorah: MyfatoorahService,
		private readonly env: EnvService,
	) {}

	@Get(MYFATOORAH_CALLBACK_ENDPOINT)
	@Redirect()
	@Public()
	async myfatoorahCallback(@Query('paymentId') paymentId: string) {
		if (!paymentId) {
			throw new BadRequestException('paymentId is required');
		}

		// use paymentId to verify the payment
		const status = await this.myfatoorah.getPaymentStatus({ paymentId });

		const invoice = await this.leaseInvoicesService.handleMyfatoorahCallback(
			status,
		);

		// Redirect to the invoice page
		const route = getRoute({
			entity: 'leaseInvoice',
			id: invoice.id,
			pageType: PageType.Id,
			params: {
				organizationId: invoice.organizationId,
				portfolioId: invoice.portfolioId,
			},
		});

		return {
			url: `${this.env.e.PUBLIC_SITE_URL}${route}`,
		};
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
		@Body(new ZodValidationPipe(leaseInvoiceUpdateSchema))
		updateLeaseInvoiceDto: UpdateLeaseInvoiceDto,
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
	@ApiCreatedResponse({ type: String, isArray: true })
	sendEmail(@Param('id') id: string, @User() user: IUser): Promise<string[]> {
		return this.leaseInvoicesService.sendInvoice({ id, user });
	}

	@Get(':id/pay')
	@Public()
	@Redirect()
	async payInvoice(@Param('id') id: string) {
		const url = await this.leaseInvoicesService.generatePaymentLink(id);
		return { url };
	}
}
