import { accessibleBy } from '@casl/prisma';
import { BadRequestException, Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Prisma } from '@prisma/client';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { WithCount } from 'src/common/dto/paginated.dto';
import { RoleCreatedEvent } from 'src/events/role-created.event';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto, RoleDto } from 'src/roles/dto/role.dto';

@Injectable()
export class RolesService {
  constructor(
    private prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
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

    const existingRole = await this.prisma.role.findFirst({
      where: {
        user: { email: createRoleDto.email },
        organizationId: createRoleDto.organizationId,
        portfolioId: createRoleDto.portfolioId,
        tenantId: createRoleDto.tenantId,
      },
      rejectOnNotFound: false,
    });

    if (existingRole) {
      throw new BadRequestException('Role already exists for this user');
    }

    const role = await this.prisma.role.create({
      data: {
        ...create,
        user: {
          connectOrCreate: {
            where: { email: createRoleDto.email },
            create: { email: createRoleDto.email },
          },
        },
      },
    });

    this.eventEmitter.emit('role.created', new RoleCreatedEvent(role.id));

    return role;
  }

  @OnEvent('role.created')
  async sendWelcomeEmail(payload: RoleCreatedEvent) {
    console.log('TODO: sendWelcomeEmail', payload);
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

  remove(id: string) {
    return this.prisma.role.delete({ where: { id } }).then(() => id);
  }
}
