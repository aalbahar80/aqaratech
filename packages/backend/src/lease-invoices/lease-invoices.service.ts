import { ForbiddenError, subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import * as R from 'remeda';
import { Action } from 'src/casl/casl-ability.factory';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PaginatedDto, PaginatedMetaDto } from 'src/common/dto/paginated.dto';
import { IUser } from 'src/interfaces/user.interface';
import {
  LeaseInvoiceDto,
  UpdateLeaseInvoiceDto,
} from 'src/lease-invoices/dto/lease-invoice.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { search } from 'src/utils/search';

@Injectable()
export class LeaseInvoicesService {
  constructor(private prisma: PrismaService) {}

  async create({
    createLeaseInvoiceDto,
    user,
  }: {
    createLeaseInvoiceDto: LeaseInvoiceDto;
    user: IUser;
  }) {
    ForbiddenError.from(user.ability).throwUnlessCan(
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
    leaseInvoicePageOptionsDto,
    user,
  }: {
    leaseInvoicePageOptionsDto: PageOptionsDto;
    user: IUser;
  }): Promise<PaginatedMetaDto<LeaseInvoiceDto>> {
    const { page, take, q } = leaseInvoicePageOptionsDto;

    let [results, itemCount] = await Promise.all([
      this.prisma.leaseInvoice.findMany({
        take,
        skip: (page - 1) * take,
        where: accessibleBy(user.ability).LeaseInvoice,
      }),
      this.prisma.leaseInvoice.count({
        where: accessibleBy(user.ability).LeaseInvoice,
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

  findOne({ id }: { id: string }) {
    return this.prisma.leaseInvoice.findUnique({ where: { id } });
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
}
