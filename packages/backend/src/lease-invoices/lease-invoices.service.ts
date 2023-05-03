import { accessibleBy } from '@casl/prisma';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';
import { Prisma } from '@prisma/client';
import * as R from 'remeda';
import { Any, Object } from 'ts-toolbelt';

import { PAID_LATE, getPayURL } from '@self/utils';
import { AggregateOptionsDto } from 'src/aggregate/dto/aggregate-options.dto';
import { Action } from 'src/casl/action.enum';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { crumbs } from 'src/common/breadcrumb-select';
import { CreatedDto, UpdatedDto } from 'src/common/dto/abstract.dto';
import { WithCount } from 'src/common/dto/paginated.dto';
import { QueryOptionsDto } from 'src/common/dto/query-options.dto';
import { PaidStatus } from 'src/constants/paid-status.enum';
import { EnvService } from 'src/env/env.service';
import {
	InvoiceSendInput,
	InvoiceSendSMSPayload,
	InvoiceSendEmailPayload,
} from 'src/events/invoice-send.event';
import { IUser } from 'src/interfaces/user.interface';
import {
	CreateLeaseInvoiceDto,
	LeaseInvoiceDto,
	UpdateLeaseInvoiceDto,
} from 'src/lease-invoices/dto/lease-invoice.dto';
import { LeaseInvoiceAggregateDto } from 'src/lease-invoices/dto/lease-invoices-extra.dto';
import { MyfatoorahService } from 'src/myfatoorah/myfatoorah.service';
import { GetPaymentStatusResult } from 'src/myfatoorah/types/myfatoorah.types';
import { NovuService } from 'src/novu/novu.service';
import { PostmarkService } from 'src/postmark/postmark.service';
import { MESSAGE_TAG } from 'src/postmark/tags';
import { PrismaService } from 'src/prisma/prisma.service';
import { kwdFormat } from 'src/utils/format';

@Injectable()
export class LeaseInvoicesService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly postmarkService: PostmarkService,
		private readonly novuService: NovuService,
		private readonly env: EnvService,
		private readonly myfatoorah: MyfatoorahService,
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
		const created = await this.prisma.c.leaseInvoice.create({
			data: {
				...createLeaseInvoiceDto,
				organizationId,
			},
		});

		return new CreatedDto(created);
	}

	async findAll({
		user,
		queryOptions,
		whereCustom,
	}: {
		user: IUser;
		queryOptions: QueryOptionsDto;
		whereCustom?: Prisma.LeaseInvoiceWhereInput;
	}): Promise<
		WithCount<LeaseInvoiceDto> & {
			sum: number;
			aggregate: LeaseInvoiceAggregateDto[];
		}
	> {
		const { take, skip, sort, filter, filterCustom } = queryOptions;

		const isPaidLateFilter = filterCustom.isPaidLate;

		const where = {
			AND: [
				accessibleBy(user.ability, Action.Read).LeaseInvoiceV,
				...(whereCustom ? [whereCustom] : []), // combine with other filters/remove?
				filter,
				{
					// undefined means no filter (PAID_LATE.ALL)
					paymentTime:
						isPaidLateFilter === PAID_LATE.ALL ? undefined : isPaidLateFilter,
				},
			],
		} satisfies Prisma.LeaseInvoiceVWhereInput;

		const [data, total, aggregate] = await Promise.all([
			this.prisma.c.leaseInvoiceV.findMany({
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
			this.prisma.c.leaseInvoiceV.count({ where }),
			this.prisma.c.leaseInvoiceV.groupBy({
				where,
				by: ['isPaid', 'paymentTime', 'dueStatus'],
				_sum: { amount: true },
			}),
		]);

		const sum = R.sumBy(aggregate, (a) => a._sum.amount ?? 0);

		return {
			total,
			results: data.map((d) => new LeaseInvoiceDto(d)),
			sum,
			// HACK: rename _sum.amount to sum.amount because openapi-generator strips leading underscores
			// https://github.com/OpenAPITools/openapi-generator/pull/14709
			// @ts-expect-error type limitation
			aggregate: R.map(
				aggregate,
				R.mapKeys((k) => (k === '_sum' ? 'sum' : k)),
			),
		};
	}

	async findOne({ id, user }: { id: string; user: IUser }) {
		const data = await this.prisma.c.leaseInvoiceV.findFirstOrThrow({
			where: {
				AND: [{ id }, accessibleBy(user.ability, Action.Read).LeaseInvoiceV],
			},
			include: { lease: crumbs.lease },
		});
		return new LeaseInvoiceDto(data);
	}

	async findOnePublic({ id }: { id: string }) {
		const data = await this.prisma.c.leaseInvoiceV.findFirstOrThrow({
			where: {
				AND: [
					{ id },
					accessibleBy(
						CaslAbilityFactory.defineUnauthenticatedAbility(),
						Action.ReadOne,
					).LeaseInvoiceV,
				],
			},
			select: {
				id: true,
				amount: true,
				isPaid: true,
				postAt: true,
				paidAt: true,
				memo: true,
			},
		});

		return data;
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
		const invoice = await this.prisma.c.leaseInvoice.findUniqueOrThrow({
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

		const updated = await this.prisma.c.leaseInvoice.update({
			where: {
				id,
				AND: accessibleBy(user.ability, Action.Update).LeaseInvoice,
			},
			data: updateLeaseInvoiceDto,
		});

		return new UpdatedDto(updated);
	}

	async remove({ id, user }: { id: string; user: IUser }) {
		const deleted = await this.prisma.c.leaseInvoice.findFirstOrThrow({
			where: {
				AND: [{ id }, accessibleBy(user.ability, Action.Delete).LeaseInvoice],
			},
			select: { id: true },
		});

		await this.prisma.c.leaseInvoice.delete({ where: { id: deleted.id } });
		return deleted.id;
	}

	async handleMyfatoorahCallback(status: GetPaymentStatusResult) {
		this.logger.log({
			message: 'Myfatoorah callback',
			status,
		});

		const originalInvoice = await this.prisma.c.leaseInvoice.findUniqueOrThrow({
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

		const paidInvoice = await this.prisma.c.leaseInvoice.update({
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
		const invoice = await this.prisma.c.leaseInvoice.findUniqueOrThrow({
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
		const invoice = await this.prisma.c.leaseInvoice.findFirstOrThrow({
			where: {
				AND: [{ id }, accessibleBy(user.ability, Action.Update).LeaseInvoice],
			},
			select: {
				id: true,
				amount: true,
				postAt: true,
				portfolioId: true,
				organizationId: true,
				lease: {
					select: {
						tenant: {
							select: {
								id: true,
								phone: true,
								roles: {
									select: { user: { select: { email: true } } },
								},
							},
						},
					},
				},
			},
		});

		return await this.notify({
			method: 'SMS',
			invoice,
		});
	}

	async notify(args: InvoiceSendInput) {
		const paymentLink = getPayURL({
			apiURL: this.env.e.PUBLIC_API_URL,
			invoiceId: args.invoice.id,
		});

		const phone = args.invoice.lease.tenant.phone;

		const emails = args.invoice.lease.tenant.roles.map(
			(role) => role.user.email,
		);

		if (args.method === 'SMS' && phone) {
			return await this.sendSMS({
				invoice: args.invoice,
				paymentLink,
				method: args.method,
				phone,
			});
		} else if (args.method === 'EMAIL' && emails.length) {
			return await this.sendEmail({
				invoice: args.invoice,
				paymentLink,
				method: args.method,
				emails,
			});
		} else {
			throw new BadRequestException(
				'No emails or phone number found for tenant',
			);
		}
	}

	async sendSMS(payload: InvoiceSendSMSPayload) {
		return await this.novuService.sendSMS({
			to: {
				subscriberId: payload.invoice.lease.tenant.id,
				phone: payload.phone,
			},
			payload: {
				content: `Use the link to view and pay your rent online: ${payload.paymentLink}`,
			},
		});
	}

	async sendEmail(payload: InvoiceSendEmailPayload) {
		const invoice = payload.invoice;

		const trxUrl = getPayURL({
			apiURL: this.env.e.PUBLIC_API_URL,
			invoiceId: invoice.id,
		});

		return await this.postmarkService.sendEmail({
			From: 'Aqaratech <notifications@aqaratech.com>',
			To: payload.emails.join(','),
			TemplateAlias: 'invoice',
			Metadata: {
				organizationId: invoice.organizationId,
				leaseInvoiceId: invoice.id,
			},
			Tag: MESSAGE_TAG.INVOICE_REMINDER,
			TemplateModel: {
				amount: kwdFormat(invoice.amount),
				date: invoice.postAt.toISOString().split('T')[0],
				trxUrl,
				monthYear: new Date(invoice.postAt).toLocaleDateString('en-US', {
					month: 'long',
					year: 'numeric',
					timeZone: 'UTC',
				}),
			},
		});
	}

	// Disabled until whatsapp is ready
	// @Cron('0 10 1,7,14 * *')
	async sendReminders() {
		this.logger.log('Sending invoice reminders', LeaseInvoicesService.name);

		// Get all invoices posted between today and beginning of the current month
		const startOfMonth = new Date(
			Date.UTC(new Date().getFullYear(), new Date().getMonth(), 1),
		);
		const invoices = await this.prisma.c.leaseInvoice.findMany({
			where: {
				AND: {
					isPaid: false,
					lease: { notify: true },
					postAt: { gte: startOfMonth, lte: new Date() },
				},
			},
			select: {
				id: true,
				amount: true,
				postAt: true,
				portfolioId: true,
				organizationId: true,
				lease: {
					select: {
						tenant: {
							select: {
								id: true,
								phone: true,
								roles: { select: { user: { select: { email: true } } } },
							},
						},
					},
				},
			},
		});

		this.logger.log(
			`Found ${invoices.length} invoices to send reminders for`,
			LeaseInvoicesService.name,
		);

		const promises = invoices.map((invoice) => {
			return this.notify({
				method: 'SMS',
				invoice,
			});
		});

		const results = await Promise.allSettled(promises);

		this.logger.log(
			{
				message: 'Invoice reminders sent',
				success: results.filter((r) => r.status === 'fulfilled').length,
				failure: results.filter((r) => r.status === 'rejected').length,
			},
			LeaseInvoicesService.name,
		);
	}

	async findMessages({ id, user }: { id: string; user: IUser }) {
		// authz check
		await this.prisma.c.leaseInvoice.findFirstOrThrow({
			where: {
				AND: [{ id }, accessibleBy(user.ability, Action.Read).LeaseInvoice],
			},
		});

		const messages = await this.postmarkService.getSentEmails({
			tag: MESSAGE_TAG.INVOICE_REMINDER,
			leaseInvoiceId: id,
		});

		return messages;
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
