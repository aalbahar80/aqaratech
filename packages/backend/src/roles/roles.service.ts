import { accessibleBy } from '@casl/prisma';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { WithCount } from 'src/common/dto/paginated.dto';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto, RoleDto } from 'src/roles/dto/role.dto';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  create(createRoleDto: CreateRoleDto) {
    let create: Prisma.RoleCreateNestedManyWithoutUserInput['create'];
    if (createRoleDto.organizationId) {
      create = {
        organization: { connect: { id: createRoleDto.organizationId } },
      };
    } else if (createRoleDto.portfolioId) {
      create = { portfolio: { connect: { id: createRoleDto.portfolioId } } };
    } else if (createRoleDto.tenantId) {
      create = { tenant: { connect: { id: createRoleDto.tenantId } } };
    } else {
      throw new BadRequestException(
        'No organization, portfolio or tenant specified',
      );
    }

    return this.prisma.user.upsert({
      where: { email: createRoleDto.email },
      create: { email: createRoleDto.email, roles: { create } },
      update: { roles: { create } },
    });
  }

  async findAll({
    pageOptionsDto,
    user,
    where,
  }: {
    pageOptionsDto: PageOptionsDto;
    user: IUser;
    where?: Prisma.RoleWhereInput;
  }): Promise<WithCount<RoleDto>> {
    const { page, take } = pageOptionsDto;

    const filter: Prisma.RoleWhereInput = {
      AND: [accessibleBy(user.ability).Role, ...(where ? [where] : [])],
    };

    // TODO fix filter/select
    let [data, total] = await Promise.all([
      this.prisma.role.findMany({
        take,
        skip: (page - 1) * take,
        orderBy: { createdAt: 'desc' },
        where: filter,
        include: { user: { select: { email: true } } },
      }),
      this.prisma.role.count({ where: filter }),
    ]);

    let results: RoleDto[] = data.map((r) => {
      const { user, ...role } = r;
      return { ...role, email: user!.email }; // TODO SCHEMA: email required
    });

    return { total, results };
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} role`;
  // }

  // update(id: number, updateRoleDto: UpdateRoleDto) {
  //   return `This action updates a #${id} role`;
  // }

  remove(id: string) {
    return `This action removes a #${id} role`;
  }
}
