import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
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
    return 'This action adds a new role';
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
        where: filter,
      }),
      this.prisma.role.count({ where: filter }),
    ]);

    return { total, results: data };
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
