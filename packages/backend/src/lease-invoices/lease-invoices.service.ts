import { accessibleBy } from '@casl/prisma';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Prisma } from '@prisma/client';
import { entitiesMap } from '@self/utils';
import { DashboardFilterDto } from 'src/aggregate/dto/aggregate.dto';
import { Action } from 'src/casl/action.enum';
import { crumbs } from 'src/common/breadcrumb-select';
import { WithCount } from 'src/common/dto/paginated.dto';
import { QueryOptionsDto } from 'src/common/dto/query-options.dto';
import { PaidStatus } from 'src/constants/paid-status.enum';
import { InvoiceSendEvent } from 'src/events/invoice-send.event';
import { EnvironmentConfig } from 'src/interfaces/environment.interface';
import { IUser } from 'src/interfaces/user.interface';
import {
	CreateLeaseInvoiceDto,
	LeaseInvoiceDto,
	UpdateLeaseInvoiceDto,
} from 'src/lease-invoices/dto/lease-invoice.dto';
import { PostmarkService } from 'src/postmark/postmark.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { kwdFormat } from 'src/utils/format';

@Injectable()
export class LeaseInvoicesService {
	constructor(
		private readonly prisma: PrismaService,
		private postmarkService: PostmarkService,
		private readonly eventEmitter: EventEmitter2,
		readonly configService: ConfigService<EnvironmentConfig>,
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
		return this.prisma.leaseInvoice.create({
			data: {
				...createLeaseInvoiceDto,
				organizationId,
			},
		});
	}

	async findAll({
		user,
		queryOptions,
		where,
	}: {
		user: IUser;
		queryOptions: QueryOptionsDto;
		where?: Prisma.LeaseInvoiceWhereInput;
	}): Promise<WithCount<LeaseInvoiceDto>> {
		const { take, skip, sort } = queryOptions;

		const filter: Prisma.LeaseInvoiceWhereInput = {
			AND: [
				accessibleBy(user.ability, Action.Read).LeaseInvoice,
				...(where ? [where] : []), // combine with other filters/remove?
			],
		};

		// Default sort
		const orderBy = sort.length ? sort : ({ postAt: 'desc' } as const);

		const [data, total] = await Promise.all([
			this.prisma.leaseInvoice.findMany({
				take,
				skip,
				orderBy,
				where: filter,
				include: { lease: crumbs.lease },
			}),
			this.prisma.leaseInvoice.count({ where: filter }),
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
		return this.prisma.leaseInvoice.update({
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
		const origin = this.configService.get('siteConfig.PUBLIC_SITE_URL', {
			infer: true,
		});

		if (!origin) {
			this.logger.warn('No site origin configured');
		}

		return this.postmarkService.sendEmail({
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
					},
				),
			},
		});
	}

	// ::: HELPERS :::

	parseLocationFilter({
		filter,
	}: {
		filter?: DashboardFilterDto;
	}): Prisma.LeaseInvoiceWhereInput {
		let locationFilter: Prisma.LeaseInvoiceWhereInput;
		if (filter?.unitId) {
			locationFilter = { lease: { unitId: filter.unitId } };
		} else if (filter?.propertyId) {
			locationFilter = { lease: { unit: { propertyId: filter.propertyId } } };
		} else {
			locationFilter = {
				portfolioId: filter?.portfolioId,
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
			return { isPaid: undefined };
		}
	}
}
