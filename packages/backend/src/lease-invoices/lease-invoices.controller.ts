import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Query,
	Redirect,
	Req,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import {
	getMyfatoorahReceipt,
	getRoute,
	leaseInvoiceUpdateSchema,
	PageType,
} from '@self/utils';
import { Public } from 'src/auth/public.decorator';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { Action } from 'src/casl/action.enum';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { User } from 'src/decorators/user.decorator';
import { EnvService } from 'src/env/env.service';
import { IUser } from 'src/interfaces/user.interface';
import {
	LeaseInvoiceDto,
	LeaseInvoicePublicDto,
	UpdateLeaseInvoiceDto,
} from 'src/lease-invoices/dto/lease-invoice.dto';
import { LeaseInvoicesService } from 'src/lease-invoices/lease-invoices.service';
import { MYFATOORAH_CALLBACK_ENDPOINT } from 'src/myfatoorah/myfatoorah-callback.const';
import { MyfatoorahService } from 'src/myfatoorah/myfatoorah.service';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { MessageDto } from 'src/postmark/message.dto';

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
	async myfatoorahCallback(
		@Req() request: Request,
		@Query('paymentId') paymentId: string,
	) {
		if (!paymentId) {
			throw new BadRequestException('paymentId is required');
		}

		// use paymentId to verify the payment
		const status = await this.myfatoorah.getPaymentStatus({ paymentId });

		const invoice = await this.leaseInvoicesService.handleMyfatoorahCallback(
			status,
		);

		const cookie = request.headers.cookie;
		const isAuthorized = cookie?.includes('idToken');

		if (!status.isPaid) {
			// If payment was not successful, redirect to public myfatoorah receipt
			// page. This clearly indicates that the payment was not successful and
			// contains details about the payment.

			const url = getMyfatoorahReceipt({
				paymentId,
				myfatoorahURL: this.env.e.PUBLIC_MYFATOORAH_SITE_URL,
			});

			return { url };
		} else if (!isAuthorized) {
			// If user is not logged in, redirect to our public invoice page.
			const route = `/en/public/leaseInvoices/${invoice.id}`;

			return {
				url: `${this.env.e.PUBLIC_SITE_URL}${route}`,
			};
		} else {
			// If user is logged in and payment was successful, redirect to  invoice
			// page in the tenant portal.
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

	@Get(':id/public')
	@Public()
	@ApiOkResponse({ type: LeaseInvoiceDto })
	findOnePublic(@Param('id') id: string): Promise<LeaseInvoicePublicDto> {
		return this.leaseInvoicesService.findOnePublic({ id });
	}

	@Patch(':id')
	@CheckAbilities({ action: Action.Update, subject: SubjectType })
	update(
		@User() user: IUser,
		@Param('id') id: string,
		@Body(new ZodValidationPipe(leaseInvoiceUpdateSchema))
		updateLeaseInvoiceDto: UpdateLeaseInvoiceDto,
	) {
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

	@Get(':id/pay')
	@Public()
	@Redirect()
	async payInvoice(@Param('id') id: string) {
		const url = await this.leaseInvoicesService.generatePaymentLink(id);
		return { url };
	}

	@Get(':id/messages')
	@CheckAbilities({ action: Action.Read, subject: SubjectType })
	async findMessages(
		@Param('id') id: string,
		@User() user: IUser,
	): Promise<MessageDto[]> {
		const messages = await this.leaseInvoicesService.findMessagesById({
			id,
			user,
		});

		return messages;
	}
}
