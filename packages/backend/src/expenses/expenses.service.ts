import { subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Action, CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PaginatedDto, PaginatedMetaDto } from 'src/common/dto/paginated.dto';
import { ExpenseDto, UpdateExpenseDto } from 'src/expenses/dto/expense.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from 'src/users/dto/user.dto';
import { selectForAuthz } from 'src/utils/authz-fields';
import { search } from 'src/utils/search';

@Injectable()
export class ExpensesService {
  constructor(
    private prisma: PrismaService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async create({
    createExpenseDto,
    user,
  }: {
    createExpenseDto: ExpenseDto;
    user: UserDto;
  }) {
    // check if user has access to create expense in this organization
    const unitQ = this.prisma.unit.findUnique({
      where: { id: createExpenseDto.unitId },
      select: selectForAuthz.unit,
    });
    const tenantQ = this.prisma.tenant.findUnique({
      where: { id: createExpenseDto.tenantId },
      select: selectForAuthz.tenant,
    });
    const [tenant, unit] = await Promise.all([tenantQ, unitQ]);

    // check if tenant and unit are in the same organization
    if (unit.property.portfolio.organizationId !== tenant.organizationId) {
      // test case
      throw new BadRequestException(
        'Tenant and unit must be in the same organization',
      );
    }

    const toCreate = {
      ...createExpenseDto,
      unit,
      tenant,
    };

    this.caslAbilityFactory.throwIfForbidden(
      user,
      Action.Create,
      subject('Expense', toCreate),
    );

    // insert
    const input: Prisma.ExpenseCreateArgs['data'] = createExpenseDto; // to make prisma call typesafe
    return this.prisma.expense.create({ data: input });
  }

  async findAll({
    expensePageOptionsDto,
    user,
  }: {
    expensePageOptionsDto: PageOptionsDto;
    user: UserDto;
  }): Promise<PaginatedMetaDto<ExpenseDto>> {
    const { page, take, q } = expensePageOptionsDto;

    const ability = this.caslAbilityFactory.defineAbility(user);
    // returns a 404 whether not found or not accessible
    let [results, itemCount] = await Promise.all([
      this.prisma.expense.findMany({
        take,
        skip: (page - 1) * take,
        where: accessibleBy(ability).Expense,
      }),
      this.prisma.expense.count({
        where: accessibleBy(ability).Expense,
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
      pageOptionsDto: expensePageOptionsDto,
    });

    return { meta, results };
  }

  async findOne({ id, user }: { id: string; user: UserDto }) {
    const ability = this.caslAbilityFactory.defineAbility(user);
    const data = await this.prisma.expense.findFirst({
      where: {
        AND: [accessibleBy(ability).Expense, { id }],
      },
    });
    return data;
  }

  async update({
    id,
    updateExpenseDto,
    user,
  }: {
    id: string;
    updateExpenseDto: UpdateExpenseDto;
    user: UserDto;
  }) {
    // grab necessary data for ability check
    // alt: use findFirst with accessibleBy,
    // but we still need to check if tenant/unit are in the same organization
    const toUpdate = await this.prisma.expense.findUnique({
      where: { id },
      select: selectForAuthz.expense,
    });

    this.caslAbilityFactory.throwIfForbidden(
      user,
      Action.Update,
      subject('Expense', toUpdate),
    );

    // not checking if tenant and unit are in the same organization
    // since it is not possible to update tenantId or unitId
    const input: Prisma.ExpenseUpdateArgs['data'] = updateExpenseDto;
    return this.prisma.expense.update({
      where: { id },
      data: input,
    });
  }

  async remove({ id, user }: { id: string; user: UserDto }) {
    const data = await this.prisma.expense.findUnique({ where: { id } });

    this.caslAbilityFactory.throwIfForbidden(
      user,
      Action.Delete,
      subject('Expense', data),
    );

    return this.prisma.expense.delete({ where: { id } });
  }
}
