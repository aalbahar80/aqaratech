import { ForbiddenError, subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Prisma } from '@prisma/client';
import * as R from 'remeda';
import { DashboardFilterDto } from 'src/aggregate/dto/aggregate.dto';
import { Action } from 'src/casl/casl-ability.factory';
import { crumbs } from 'src/common/breadcrumb-select';
import { WithCount } from 'src/common/dto/paginated.dto';
import { PaidStatus } from 'src/constants/paid-status.enum';
import { InvoiceSendEvent } from 'src/events/invoice-send.event';
import { EnvironmentConfig } from 'src/interfaces/environment.interface';
import { IUser } from 'src/interfaces/user.interface';
import { LeaseInvoiceOptionsDto } from 'src/lease-invoices/dto/lease-invoice-options.dto';
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
    private prisma: PrismaService,
    private postmarkService: PostmarkService,
    private readonly eventEmitter: EventEmitter2,
    readonly configService: ConfigService<EnvironmentConfig>,
  ) {}

  private readonly logger = new Logger(LeaseInvoicesService.name);

  async create({
    createLeaseInvoiceDto,
    user,
  }: {
    createLeaseInvoiceDto: CreateLeaseInvoiceDto;
    user: IUser;
  }) {
    ForbiddenError.from(user.ability).throwUnlessCan(
      Action.Create,
      subject('LeaseInvoice', createLeaseInvoiceDto),
    );

    const toCreate = R.omit(createLeaseInvoiceDto, ['leaseId']);
    const created = await this.prisma.leaseInvoice.create({
      data: {
        ...toCreate,
        lease: { connect: { id: createLeaseInvoiceDto.leaseId } },
      },
    });
    return created.id;
  }

  async findAll({
    pageOptionsDto,
    user,
    where,
  }: {
    pageOptionsDto: LeaseInvoiceOptionsDto;
    user: IUser;
    where?: Prisma.LeaseInvoiceWhereInput;
  }): Promise<WithCount<LeaseInvoiceDto>> {
    const { page, take } = pageOptionsDto;

    const filter: Prisma.LeaseInvoiceWhereInput = {
      AND: [
        accessibleBy(user.ability).LeaseInvoice,
        ...this.parseFilter({ pageOptionsDto }),
        ...(where ? [where] : []), // combine with other filters/remove?
      ],
    };

    let [data, total] = await Promise.all([
      this.prisma.leaseInvoice.findMany({
        take,
        skip: (page - 1) * take,
        orderBy: { postAt: 'desc' },
        where: filter,
        include: { lease: crumbs.lease },
      }),
      this.prisma.leaseInvoice.count({ where: filter }),
    ]);

    return { total, results: data.map((d) => new LeaseInvoiceDto(d)) };
  }

  async findOne({ id }: { id: string }) {
    const data = await this.prisma.leaseInvoice.findUnique({
      where: { id },
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
    ForbiddenError.from(user.ability).throwUnlessCan(
      Action.Update,
      subject('LeaseInvoice', { id, ...updateLeaseInvoiceDto }),
    );

    const updated = await this.prisma.leaseInvoice.update({
      where: { id },
      data: updateLeaseInvoiceDto,
    });
    return updated.id;
  }

  async remove({ id }: { id: string }) {
    const removed = await this.prisma.leaseInvoice.delete({ where: { id } });
    return removed.id;
  }

  async sendInvoice(id: string) {
    const invoice = await this.prisma.leaseInvoice.findUnique({
      where: { id },
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
    const origin = this.configService.get('siteConfig.SITE_ORIGIN', {
      infer: true,
    });

    if (!origin) {
      this.logger.warn('No site origin configured');
    }

    return this.postmarkService.sendEmailWithTemplate({
      From: 'Aqaratech <notifications@aqaratech.com>',
      To: payload.email,
      TemplateAlias: 'invoice',
      TemplateModel: {
        amount: kwdFormat(payload.invoice.amount),
        date: payload.invoice.postAt.toISOString().split('T')[0],
        trxUrl: origin
          ? `${origin}/invoices/${payload.invoice.id}`
          : `https://aqaratech.com/invoices/${payload.invoice.id}`,
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

  parseFilter({
    pageOptionsDto,
  }: {
    pageOptionsDto: LeaseInvoiceOptionsDto;
  }): Prisma.LeaseInvoiceWhereInput[] {
    const { start, end, paidStatus } = pageOptionsDto;
    return [
      this.parseLocationFilter({ filter: pageOptionsDto }),
      {
        postAt: { gte: start, lte: end },
        ...this.parseIsPaidFilter({ paidStatus }),
      },
    ];
  }

  parseLocationFilter({
    filter,
  }: {
    filter?: DashboardFilterDto;
  }): Prisma.LeaseInvoiceWhereInput {
    let locationFilter: Prisma.LeaseInvoiceWhereInput;
    if (filter?.unitId) {
      locationFilter = { lease: { unit: { id: filter.unitId } } };
    } else if (filter?.propertyId) {
      locationFilter = { lease: { unit: { propertyId: filter.propertyId } } };
    } else {
      locationFilter = {
        lease: { unit: { property: { portfolioId: filter?.portfolioId } } },
      };
    }
    return locationFilter;
  }

  parseIsPaidFilter({
    paidStatus,
  }: {
    paidStatus: LeaseInvoiceOptionsDto['paidStatus'];
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
