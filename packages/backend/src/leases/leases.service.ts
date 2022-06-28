import { ForbiddenError, subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import * as R from 'remeda';
import { Action } from 'src/casl/casl-ability.factory';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PaginatedDto, PaginatedMetaDto } from 'src/common/dto/paginated.dto';
import { IUser } from 'src/interfaces/user.interface';
import { LeaseDto, UpdateLeaseDto } from 'src/leases/dto/lease.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { search } from 'src/utils/search';

@Injectable()
export class LeasesService {
  constructor(private prisma: PrismaService) {}

  async create({
    createLeaseDto,
    user,
  }: {
    createLeaseDto: LeaseDto;
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
    leasePageOptionsDto,
    user,
  }: {
    leasePageOptionsDto: PageOptionsDto;
    user: IUser;
  }): Promise<PaginatedMetaDto<LeaseDto>> {
    const { page, take, q } = leasePageOptionsDto;

    let [results, itemCount] = await Promise.all([
      this.prisma.lease.findMany({
        take,
        skip: (page - 1) * take,
        where: accessibleBy(user.ability).Lease,
      }),
      this.prisma.lease.count({
        where: accessibleBy(user.ability).Lease,
      }),
    ]);

    if (q) {
      results = search({
        data: results,
        q,
        keys: ['id', 'tenantId', 'unitId', 'license'],
      });
    }

    const meta = new PaginatedDto({
      itemCount,
      pageOptionsDto: leasePageOptionsDto,
    });

    return { meta, results };
  }

  findOne({ id }: { id: string }) {
    return this.prisma.lease.findUnique({ where: { id } });
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
}
