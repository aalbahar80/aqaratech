import { ForbiddenError, subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as R from 'remeda';
import { Action } from 'src/casl/casl-ability.factory';
import { BreadcrumbDto } from 'src/common/dto/breadcrumb.dto';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PaginatedDto, PaginatedMetaDto } from 'src/common/dto/paginated.dto';
import { Rel } from 'src/constants/rel.enum';
import { IUser } from 'src/interfaces/user.interface';
import {
  CreateLeaseDto,
  LeaseBreadcrumbsDto,
  LeaseDto,
  UpdateLeaseDto,
} from 'src/leases/dto/lease.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { search } from 'src/utils/search';

@Injectable()
export class LeasesService {
  constructor(private prisma: PrismaService) {}

  async create({
    createLeaseDto,
    user,
  }: {
    createLeaseDto: CreateLeaseDto;
    user: IUser;
  }) {
    ForbiddenError.from(user.ability).throwUnlessCan(
      Action.Create,
      subject('Lease', createLeaseDto),
    );

    const toCreate = R.omit(createLeaseDto, ['tenantId', 'unitId']);
    return this.prisma.lease.create({
      data: {
        ...toCreate,
        unit: { connect: { id: createLeaseDto.unitId } },
        tenant: { connect: { id: createLeaseDto.tenantId } },
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
  }): Promise<PaginatedMetaDto<LeaseDto>> {
    const { page, take, q, filter: qfilter } = pageOptionsDto;

    const filter: Prisma.LeaseWhereInput = {
      AND: [accessibleBy(user.ability).Lease, ...(where ? [where] : [])],
      ...qfilter,
    };

    const orderBy = pageOptionsDto.orderBy
      ? { [pageOptionsDto.orderBy]: pageOptionsDto.sortOrder }
      : {};

    let [results, itemCount] = await Promise.all([
      this.prisma.lease.findMany({
        take,
        skip: (page - 1) * take,
        where: filter,
        orderBy,
      }),
      this.prisma.lease.count({ where: filter }),
    ]);

    if (q) {
      results = search({
        data: results,
        q,
        keys: ['id', 'tenantId', 'unitId', 'license'],
      });
    }

    const promises = results.map((lease) => {
      const breadcrumbs = this.getBreadcrumbs(lease.id);
      return Promise.all([breadcrumbs]).then(([breadcrumbs]) => ({
        ...lease,
        breadcrumbs,
      }));
    });

    const leases = await Promise.all(promises);

    const pagination = new PaginatedDto({
      itemCount,
      pageOptionsDto: pageOptionsDto,
      pageSize: leases.length,
    });

    return { pagination, results: leases };
  }

  async findOne({ id }: { id: string }) {
    const [lease, breadcrumbs] = await Promise.all([
      this.prisma.lease.findUnique({ where: { id } }),
      this.getBreadcrumbs(id),
    ]);

    return { ...lease, breadcrumbs };
  }

  update({
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
      subject('Lease', { id, ...updateLeaseDto }),
    );

    return this.prisma.lease.update({
      where: { id },
      data: updateLeaseDto,
    });
  }

  remove({ id }: { id: string }) {
    return this.prisma.lease.delete({ where: { id } });
  }

  // ::: HELPERS :::

  async getBreadcrumbs(id: string): Promise<LeaseBreadcrumbsDto> {
    const lease = await this.prisma.lease.findUnique({
      where: { id },
      select: {
        tenant: true,
        unit: {
          select: {
            id: true,
            propertyId: true,
            unitNumber: true,
            type: true,
            // TODO only fetch relevant fields
            property: { include: { portfolio: true } },
          },
        },
      },
    });

    return {
      portfolio: new BreadcrumbDto({
        rel: Rel.Portfolio,
        ...lease.unit.property.portfolio,
      }),
      property: new BreadcrumbDto({
        rel: Rel.Property,
        ...lease.unit.property,
      }),
      unit: new BreadcrumbDto({
        rel: Rel.Unit,
        ...lease.unit,
      }),
      tenant: new BreadcrumbDto({
        rel: Rel.Tenant,
        ...lease.tenant,
      }),
    };
  }
}
