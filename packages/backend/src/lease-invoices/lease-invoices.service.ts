import { subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Action, CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PaginatedDto, PaginatedMetaDto } from 'src/common/dto/paginated.dto';
import {
  LeaseInvoiceDto,
  UpdateLeaseInvoiceDto,
} from 'src/lease-invoices/dto/lease-invoice.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from 'src/users/dto/user.dto';
import { selectForAuthz } from 'src/utils/authz-fields';
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
    createLeaseInvoiceDto: LeaseInvoiceDto;
    user: UserDto;
  }) {
    const ability = this.caslAbilityFactory.defineAbility(user);
    const lease = await this.prisma.lease.findFirst({
      where: {
        AND: [
          accessibleBy(ability).LeaseInvoice,
          { id: createLeaseInvoiceDto.leaseId },
        ],
      },
      select: selectForAuthz.lease,
    });

    const toCreate = {
      ...createLeaseInvoiceDto,
      lease,
    };

    this.caslAbilityFactory.throwIfForbidden(
      user,
      Action.Create,
      subject('LeaseInvoice', toCreate),
    );

    // insert
    const input: Prisma.LeaseInvoiceCreateArgs['data'] = createLeaseInvoiceDto; // to make prisma call typesafe
    return this.prisma.leaseInvoice.create({ data: input });
  }

  async findAll({
    leaseInvoicePageOptionsDto,
    user,
  }: {
    leaseInvoicePageOptionsDto: PageOptionsDto;
    user: UserDto;
  }): Promise<PaginatedMetaDto<LeaseInvoiceDto>> {
    const { page, take, q } = leaseInvoicePageOptionsDto;

    const ability = this.caslAbilityFactory.defineAbility(user);
    // TODO test this
    // https://casl.js.org/v5/en/package/casl-prisma#finding-accessible-records
    // returns a 404 whether not found or not accessible
    let [results, itemCount] = await Promise.all([
      this.prisma.leaseInvoice.findMany({
        take,
        skip: (page - 1) * take,
        where: accessibleBy(ability).LeaseInvoice,
      }),
      this.prisma.leaseInvoice.count({
        where: accessibleBy(ability).LeaseInvoice,
      }),
    ]);

    if (q) {
      results = search({
        data: results,
        q,
        keys: ['id'],
      });
    }

    const meta = new PaginatedDto({
      itemCount,
      pageOptionsDto: leaseInvoicePageOptionsDto,
    });

    return { meta, results };
  }

  async findOne({ id, user }: { id: string; user: UserDto }) {
    const ability = this.caslAbilityFactory.defineAbility(user);
    const data = await this.prisma.leaseInvoice.findFirst({
      where: {
        AND: [accessibleBy(ability).LeaseInvoice, { id }],
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
    user: UserDto;
  }) {
    // grab necessary data for ability check
    const toUpdate = await this.prisma.leaseInvoice.findUnique({
      where: { id },
      select: selectForAuthz.leaseInvoice,
    });

    this.caslAbilityFactory.throwIfForbidden(
      user,
      Action.Update,
      subject('LeaseInvoice', toUpdate),
    );

    const input: Prisma.LeaseInvoiceUpdateArgs['data'] = updateLeaseInvoiceDto;
    return this.prisma.leaseInvoice.update({
      where: { id },
      data: input,
    });
  }

  async remove({ id, user }: { id: string; user: UserDto }) {
    const data = await this.prisma.leaseInvoice.findUnique({
      where: { id },
      select: selectForAuthz.leaseInvoice,
    });

    this.caslAbilityFactory.throwIfForbidden(
      user,
      Action.Delete,
      subject('LeaseInvoice', data),
    );

    return this.prisma.leaseInvoice.delete({ where: { id } });
  }
}
