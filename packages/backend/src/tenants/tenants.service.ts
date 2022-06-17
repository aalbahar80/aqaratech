import { Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

import { PrismaService } from 'src/prisma/prisma.service';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { TenantDto } from 'src/tenants/dto/tenant.dto';
import { TenantPageOptionsDto } from 'src/tenants/dto/tenant-page-options.dto';

@Injectable()
export class TenantsService {
  constructor(private prisma: PrismaService) {}

  create(createTenantDto: CreateTenantDto) {
    return this.prisma.tenant.create({
      data: createTenantDto,
    });
  }

  async findAll(tenantPageOptionsDto: TenantPageOptionsDto) {
    const data = await this.prisma.tenant.findMany();

    const meta = new PaginatedDto<TenantDto>({
      itemCount: 33,
      pageOptionsDto: tenantPageOptionsDto,
    });

    return { ...meta, results: data };
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
