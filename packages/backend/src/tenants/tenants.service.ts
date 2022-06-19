import { Injectable } from '@nestjs/common';
import { TenantPageOptionsDto } from 'src/tenants/dto/tenant-page-options.dto';
import { TenantDto } from 'src/tenants/dto/tenant.dto';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

import { PaginatedDto, PaginatedMetaDto } from 'src/common/dto/paginated.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TenantsService {
  constructor(private prisma: PrismaService) {}

  create(createTenantDto: CreateTenantDto) {
    return this.prisma.tenant.create({
      data: { ...createTenantDto, organizationId: 'implement' },
    });
  }

  async findAll(
    tenantPageOptionsDto: TenantPageOptionsDto,
  ): Promise<PaginatedMetaDto<TenantDto>> {
    // const ability = this.caslAbilityFactory.createForUser(user);
    const { page, take } = tenantPageOptionsDto;

    // TODO authz for both queries
    const [results, itemCount] = await Promise.all([
      this.prisma.tenant.findMany({
        take,
        skip: (page - 1) * take,
      }),
      this.prisma.tenant.count(),
    ]);

    const meta = new PaginatedDto({
      itemCount,
      pageOptionsDto: tenantPageOptionsDto,
    });

    return { meta, results };
  }

  findOne(id: string) {
    return this.prisma.tenant.findUnique({ where: { id } });
  }

  update(id: string, updateTenantDto: UpdateTenantDto) {
    return this.prisma.tenant.update({
      where: { id },
      data: updateTenantDto,
    });
  }

  remove(id: string) {
    return this.prisma.tenant.delete({ where: { id } });
  }
}
