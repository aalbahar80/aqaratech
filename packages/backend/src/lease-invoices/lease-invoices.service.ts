import { ForbiddenError, subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as R from 'remeda';
import { Action, CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PaginatedDto, PaginatedMetaDto } from 'src/common/dto/paginated.dto';
import { Rel } from 'src/constants/rel.enum';
import { IUser } from 'src/interfaces/user.interface';
import {
  CreateLeaseInvoiceDto,
  LeaseInvoiceBreadcrumbsDto,
  LeaseInvoiceDto,
  UpdateLeaseInvoiceDto,
} from 'src/lease-invoices/dto/lease-invoice.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { search } from 'src/utils/search';

@Injectable()
export class LeaseInvoicesService {
  constructor(
    private prisma: PrismaService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async create({
    createLeaseInvoiceDto,
    user,
  }: {
    createLeaseInvoiceDto: CreateLeaseInvoiceDto;
    user: IUser;
  }) {
    // not using cached user ability since this endpoint is often hit directly after creating lease.
    const ability = await this.caslAbilityFactory.defineAbility(user);
    ForbiddenError.from(ability).throwUnlessCan(
      Action.Create,
      subject('LeaseInvoice', createLeaseInvoiceDto),
    );

    const toCreate = R.omit(createLeaseInvoiceDto, ['leaseId']);
    return this.prisma.leaseInvoice.create({
      data: {
        ...toCreate,
        lease: { connect: { id: createLeaseInvoiceDto.leaseId } },
      },
    });
  }

  async findAll({
    pageOptionsDto,
    user,
    where,
  }: {
    pageOptionsDto: PageOptionsDto;
    user: IUser;
    where?: Prisma.LeaseWhereInput;
  }): Promise<PaginatedMetaDto<LeaseInvoiceDto>> {
    const { page, take, q } = pageOptionsDto;

    const filter: Prisma.LeaseInvoiceWhereInput = {
      AND: [accessibleBy(user.ability).LeaseInvoice, ...(where ? [where] : [])],
    };

    let [results, itemCount] = await Promise.all([
      this.prisma.leaseInvoice.findMany({
        take,
        skip: (page - 1) * take,
        where: filter,
      }),
      this.prisma.leaseInvoice.count({ where: filter }),
    ]);

    if (q) {
      results = search({
        data: results,
        q,
        keys: ['id'],
      });
    }
    const promises = results.map(async (result) => {
      const breadcrumbs = await this.getBreadcrumbs(result.id);
      return {
        ...result,
        breadcrumbs,
      };
    });

    const invoices = await Promise.all(promises);

    const pagination = new PaginatedDto({
      itemCount,
      pageOptionsDto: pageOptionsDto,
      pageSize: invoices.length,
    });

    return { pagination, results: invoices };
  }

  async findOne({ id }: { id: string }) {
    const [lease, breadcrumbs] = await Promise.all([
      this.prisma.leaseInvoice.findUnique({ where: { id } }),
      this.getBreadcrumbs(id),
    ]);
    return { ...lease, breadcrumbs };
  }

  update({
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

    return this.prisma.leaseInvoice.update({
      where: { id },
      data: updateLeaseInvoiceDto,
    });
  }

  remove({ id }: { id: string }) {
    return this.prisma.leaseInvoice.delete({ where: { id } });
  }

  // ::: HELPERS :::

  async getBreadcrumbs(id: string): Promise<LeaseInvoiceBreadcrumbsDto> {
    const invoice = await this.prisma.leaseInvoice.findUnique({
      where: { id },
      select: {
        leaseId: true,
        lease: {
          select: {
            tenantId: true,
            unit: {
              select: {
                id: true,
                propertyId: true,
                property: { select: { portfolioId: true } },
              },
            },
          },
        },
      },
    });

    return {
      portfolio: {
        rel: Rel.Portfolio,
        href: `/portfolios/${invoice.lease.unit.property.portfolioId}`,
      },
      property: {
        rel: Rel.Property,
        href: `/properties/${invoice.lease.unit.propertyId}`,
      },
      unit: {
        rel: Rel.Unit,
        href: `/units/${invoice.lease.unit.id}`,
      },
      tenant: {
        rel: Rel.Tenant,
        href: `/tenants/${invoice.lease.tenantId}`,
      },
      lease: {
        rel: Rel.Lease,
        href: `/leases/${invoice.leaseId}`,
      },
    };
  }
}
