import { ForbiddenError, subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Action } from 'src/casl/casl-ability.factory';
import { frisk } from 'src/casl/frisk';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { WithCount } from 'src/common/dto/paginated.dto';
import { IUser } from 'src/interfaces/user.interface';
import { CreateManyLeaseInvoicesDto } from 'src/lease-invoices/dto/lease-invoice.dto';
import {
  CreateLeaseDto,
  LeaseDto,
  UpdateLeaseDto,
} from 'src/leases/dto/lease.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LeasesService {
  constructor(private readonly prisma: PrismaService) {}
  SubjectType = 'Lease' as const;

  async create({
    createLeaseDto,
    user,
  }: {
    createLeaseDto: CreateLeaseDto;
    user: IUser;
  }) {
    ForbiddenError.from(user.ability).throwUnlessCan(
      Action.Create,
      subject(this.SubjectType, createLeaseDto),
    );

    return this.prisma.lease.create({ data: createLeaseDto });
  }

  async findAll({
    pageOptionsDto,
    user,
    where,
  }: {
    pageOptionsDto: PageOptionsDto;
    user: IUser;
    where?: Prisma.LeaseWhereInput;
  }): Promise<WithCount<LeaseDto>> {
    const { page, take, filter: qfilter } = pageOptionsDto;

    const filter: Prisma.LeaseWhereInput = {
      AND: [accessibleBy(user.ability).Lease, ...(where ? [where] : [])],
      ...qfilter,
    };

    const orderBy = pageOptionsDto.orderBy
      ? { [pageOptionsDto.orderBy]: pageOptionsDto.sortOrder }
      : { createdAt: 'desc' as Prisma.SortOrder };

    const [data, total] = await Promise.all([
      this.prisma.lease.findMany({
        take,
        skip: (page - 1) * take,
        where: filter,
        orderBy,
        include: {
          tenant: { select: { id: true, fullName: true } },
          unit: {
            select: {
              id: true,
              propertyId: true,
              unitNumber: true,
              type: true,
              property: {
                select: {
                  id: true,
                  area: true,
                  block: true,
                  number: true,
                  portfolio: { select: { id: true, fullName: true } },
                },
              },
            },
          },
        },
      }),
      this.prisma.lease.count({ where: filter }),
    ]);

    return { total, results: data.map((l) => new LeaseDto(l)) };
  }

  async findOne({ id }: { id: string }) {
    const data = await this.prisma.lease.findUnique({
      where: { id },
      include: {
        tenant: { select: { id: true, fullName: true } },
        unit: {
          select: {
            id: true,
            propertyId: true,
            unitNumber: true,
            type: true,
            property: {
              select: {
                id: true,
                area: true,
                block: true,
                number: true,
                portfolio: { select: { id: true, fullName: true } },
              },
            },
          },
        },
      },
    });
    return new LeaseDto(data);
  }

  async update({
    id,
    updateLeaseDto,
    user,
  }: {
    id: string;
    updateLeaseDto: UpdateLeaseDto;
    user: IUser;
  }) {
    ForbiddenError.from(user.ability).throwUnlessCan(
      Action.Update,
      subject(this.SubjectType, updateLeaseDto),
    );

    const frisked = frisk({
      user,
      SubjectType: this.SubjectType,
      instance: updateLeaseDto,
    });

    return this.prisma.lease.update({ where: { id }, data: frisked });
  }

  async remove({ id }: { id: string }) {
    const deleted = await this.prisma.lease.delete({ where: { id } });
    return deleted.id;
  }

  // ::: INVOICES :::

  async createInvoices({
    leaseId,
    createManyLeaseInvoicesDto,
  }: {
    leaseId: string;
    createManyLeaseInvoicesDto: CreateManyLeaseInvoicesDto[];
  }) {
    const updated = await this.prisma.lease.update({
      where: { id: leaseId },
      data: {
        leaseInvoices: {
          createMany: {
            // @ts-ignore
            data: createManyLeaseInvoicesDto,
          },
        },
      },
    });
    return updated.id;
  }
}
