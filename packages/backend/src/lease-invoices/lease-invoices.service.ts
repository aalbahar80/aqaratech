import { accessibleBy } from '@casl/prisma';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';
import { Prisma } from '@prisma/client';
import { Any, Object } from 'ts-toolbelt';

import { entitiesMap } from '@self/utils';
import { AggregateOptionsDto } from 'src/aggregate/dto/aggregate-options.dto';
import { Action } from 'src/casl/action.enum';
import { crumbs } from 'src/common/breadcrumb-select';
import { WithCount } from 'src/common/dto/paginated.dto';
import { QueryOptionsDto } from 'src/common/dto/query-options.dto';
import { PaidStatus } from 'src/constants/paid-status.enum';
import { EnvService } from 'src/env/env.service';
import { InvoiceSendEvent } from 'src/events/invoice-send.event';
import { IUser } from 'src/interfaces/user.interface';
import {
	CreateLeaseInvoiceDto,
	LeaseInvoiceDto,
	UpdateLeaseInvoiceDto,
} from 'src/lease-invoices/dto/lease-invoice.dto';
import { MyfatoorahService } from 'src/myfatoorah/myfatoorah.service';
import { GetPaymentStatusResult } from 'src/myfatoorah/types/myfatoorah.types';
import { PostmarkService } from 'src/postmark/postmark.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { kwdFormat } from 'src/utils/format';

@Injectable()
export class LeaseInvoicesService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly postmarkService: PostmarkService,
		private readonly eventEmitter: EventEmitter2,
		private readonly env: EnvService,
		private readonly myfatoorah: MyfatoorahService,
		// @ts-expect-error until update to ts 5.0
		@InjectSentry() private readonly sentry: SentryService,
	) {}
	SubjectType = 'LeaseInvoice' as const;

	private readonly logger = new Logger(LeaseInvoicesService.name);

	async create({
		createLeaseInvoiceDto,
		organizationId,
	}: {
		createLeaseInvoiceDto: CreateLeaseInvoiceDto;
		organizationId: string;
	}) {
		return await this.prisma.leaseInvoice.create({
			data: {
				...createLeaseInvoiceDto,
				organizationId,
			},
		});
	}

	async findAll({
		user,
		queryOptions,
		whereCustom,
	}: {
		user: IUser;
		queryOptions: QueryOptionsDto;
		whereCustom?: Prisma.LeaseInvoiceWhereInput;
	}): Promise<WithCount<LeaseInvoiceDto>> {
		const { take, skip, sort, filter, filterCustom } = queryOptions;

		const where = {
			AND: [
				accessibleBy(user.ability, Action.Read).LeaseInvoice,
				...(whereCustom ? [whereCustom] : []), // combine with other filters/remove?
				filter,
				// differentiate between undefined and false.
				// undefined means no filter, false means filter for false
				filterCustom['isPaidLate'] === true
					? { paidAt: { gt: this.prisma.leaseInvoice.fields.dueAt } }
					: filterCustom['isPaidLate'] === false
					? { paidAt: { lte: this.prisma.leaseInvoice.fields.dueAt } }
					: {},
			],
		} satisfies Prisma.LeaseInvoiceWhereInput;

		const [data, total] = await Promise.all([
			this.prisma.leaseInvoice.findMany({
				take,
				skip,
				orderBy: sort,
				where,
				select: {
					// Explicitly select fields because prisma will return all fields by
					// default. Most notably, we want to avoid returning the mfData field
					// for performance reasons.
					id: true,
					createdAt: true,
					updatedAt: true,
					dueAt: true,
					postAt: true,
					paidAt: true,
					isPaid: true,
					amount: true,
					memo: true,
					mfPaymentId: true,
					leaseId: true,
					portfolioId: true,
					organizationId: true,
					lease: crumbs.lease,
				},
			}),
			this.prisma.leaseInvoice.count({ where }),
		]);

		return { total, results: data.map((d) => new LeaseInvoiceDto(d)) };
	}

	async findOne({ id, user }: { id: string; user: IUser }) {
		const data = await this.prisma.leaseInvoice.findFirstOrThrow({
			where: {
				AND: [{ id }, accessibleBy(user.ability, Action.Read).LeaseInvoice],
			},
			include: { lease: crumbs.lease },
		});
		return new LeaseInvoiceDto(data);
	}

	async update({
		id,
		updateLeaseInvoiceDto,
		user,
	}: {
		id: string;
		updateLeaseInvoiceDto: UpdateLeaseInvoiceDto;
		user: IUser;
	}) {
		const invoice = await this.prisma.leaseInvoice.findUniqueOrThrow({
			where: {
				id,
				AND: accessibleBy(user.ability, Action.Update).LeaseInvoice,
			},
		});

		const isPaidOnline = invoice.isPaid && invoice.mfPaymentId;

		if (isPaidOnline) {
			throw new BadRequestException(
				'Cannot update invoices that were paid online.',
			);
		}

		return await this.prisma.leaseInvoice.update({
			where: {
				id,
				AND: accessibleBy(user.ability, Action.Update).LeaseInvoice,
			},
			data: updateLeaseInvoiceDto,
		});
	}

	async remove({ id, user }: { id: string; user: IUser }) {
		const deleted = await this.prisma.leaseInvoice.findFirstOrThrow({
			where: {
				AND: [{ id }, accessibleBy(user.ability, Action.Delete).LeaseInvoice],
			},
			select: { id: true },
		});

		await this.prisma.leaseInvoice.delete({ where: { id: deleted.id } });
		return deleted.id;
	}

	async handleMyfatoorahCallback(status: GetPaymentStatusResult) {
		this.logger.log({
			message: 'Myfatoorah callback',
			status,
		});

		const originalInvoice = await this.prisma.leaseInvoice.findUniqueOrThrow({
			where: { id: status.leaseInvoiceId },
		});

		if (!status.isPaid) {
			this.logger.log({
				level: 'warn',
				message: 'Myfatoorah callback: payment not successful',
				status,
				originalInvoice,
			});

			this.sentry.instance().captureEvent(
				{
					level: 'info',
					message: 'Myfatoorah callback: payment not successful',
					tags: {
						organizationId: originalInvoice.organizationId,
						portfolioId: originalInvoice.portfolioId,
					},
				},
				{
					data: {
						invoice: originalInvoice,
						myfatoorah: status,
					},
				},
			);

			return originalInvoice;
		}

		const paidInvoice = await this.prisma.leaseInvoice.update({
			where: {
				id: status.leaseInvoiceId,
				// Don't check for isPaid here, check was done when generating the link
			},
			data: {
				isPaid: true,
				paidAt: new Date(),
				mfPaymentId: status.paymentId,
				// Prisma.DbNull means that the entire db field will be set to null
				// https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#inserting-null-values
				mfData: status.json ?? Prisma.DbNull,
			},
		});

		return paidInvoice;
	}

	async generatePaymentLink(id: string) {
		const invoice = await this.prisma.leaseInvoice.findUniqueOrThrow({
			where: { id: id },
			include: {
				lease: {
					include: {
						tenant: { select: { id: true, fullName: true, phone: true } },
					},
				},
			},
		});

		let error: string | undefined;

		if (invoice.isPaid) {
			error = 'Invoice is already paid';
		}

		if (invoice.postAt > new Date()) {
			error = 'Invoice is not yet posted';
		}

		if (!invoice.lease.canPay) {
			error = 'Online payments are disabled for this lease';
		}

		if (error) {
			throw new BadRequestException(error, {
				cause: new Error(`Failed to generate payment link: ${error}`, {
					cause: invoice,
				}),
			});
		}

		const link = await this.myfatoorah.createPaymentLink({
			organizationId: invoice.organizationId,
			reference: invoice.id,
			amount: invoice.amount,
			name: invoice.lease.tenant.fullName,
			callbackUrl: this.myfatoorah.getCallbackURL(),
		});

		return link;
	}

	async sendInvoice({ id, user }: { id: string; user: IUser }) {
		const invoice = await this.prisma.leaseInvoice.findFirstOrThrow({
			where: {
				AND: [{ id }, accessibleBy(user.ability, Action.Update).LeaseInvoice],
			},
			select: {
				id: true,
				amount: true,
				postAt: true,
				lease: {
					select: {
						tenant: {
							select: {
								roles: { select: { user: { select: { email: true } } } },
							},
						},
					},
				},
			},
		});

		const emails = invoice.lease.tenant.roles.map((role) => role.user.email);

		if (!emails.length) {
			throw new BadRequestException('No emails found for tenant.');
		}

		emails.forEach((email) =>
			this.eventEmitter.emit(
				'invoice.send',
				new InvoiceSendEvent(email, invoice),
			),
		);

		return `Invoice will be sent to ${emails.join(', ')}.`;
	}

	@OnEvent('invoice.send')
	async sendEmail(payload: InvoiceSendEvent) {
		const origin = this.env.e.PUBLIC_SITE_URL;

		if (!origin) {
			this.logger.warn('No site origin configured');
		}

		return await this.postmarkService.sendEmail({
			From: 'Aqaratech <notifications@aqaratech.com>',
			To: payload.email,
			TemplateAlias: 'invoice',
			TemplateModel: {
				amount: kwdFormat(payload.invoice.amount),
				date: payload.invoice.postAt.toISOString().split('T')[0],
				trxUrl: origin
					? `${origin}/${entitiesMap.leaseInvoice.urlName}/${payload.invoice.id}`
					: `https://aqaratech.com/${entitiesMap.leaseInvoice.urlName}/${payload.invoice.id}`,
				monthYear: new Date(payload.invoice.postAt).toLocaleDateString(
					'en-US',
					{
						month: 'long',
						year: 'numeric',
						timeZone: 'UTC',
					},
				),
			},
		});
	}

	// ::: HELPERS :::

	parseLocationFilter({
		filter,
	}: {
		// Add undefined type to values
		filter: Object.Update<
			Pick<AggregateOptionsDto, 'propertyId' | 'unitId'>,
			'propertyId' | 'unitId',
			Any.x | undefined
		> & {
			portfolioId: string;
		};
	}): Prisma.LeaseInvoiceWhereInput {
		let locationFilter: Prisma.LeaseInvoiceWhereInput;
		if (filter.unitId) {
			locationFilter = { lease: { unitId: filter.unitId } };
		} else if (filter.propertyId) {
			locationFilter = { lease: { unit: { propertyId: filter.propertyId } } };
		} else {
			locationFilter = {
				portfolioId: filter.portfolioId,
			};
		}
		return locationFilter;
	}

	parseIsPaidFilter({
		paidStatus,
	}: {
		paidStatus: PaidStatus;
	}): Prisma.LeaseInvoiceWhereInput {
		if (paidStatus === PaidStatus.PAID) {
			return { isPaid: true };
		} else if (paidStatus === PaidStatus.UNPAID) {
			return { isPaid: false };
		} else {
			return {};
		}
	}
}
