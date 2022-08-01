import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { defaultExpenseCategoryTree } from 'src/constants/default-expense-categories';
import { AuthenticatedUser } from 'src/interfaces/user.interface';
import {
  CreateExpenseCategoryDto,
  ExpenseCategoryDto,
} from 'src/organizations/dto/expenseCategory.dto';
import { CreateOrganizationDto } from 'src/organizations/dto/organization.dto';
import {
  OrganizationSettingsDto,
  UpdateOrganizationSettingsDto,
} from 'src/organizations/dto/organizationSettings.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateId } from 'src/utils/get-nanoid';

@Injectable()
export class OrganizationsService {
  constructor(private prisma: PrismaService) {}

  private readonly logger = new Logger(OrganizationsService.name);

  async create({
    createOrganizationDto,
    user,
  }: {
    createOrganizationDto: CreateOrganizationDto;
    user: AuthenticatedUser;
  }) {
    this.logger.debug(
      `${user.email} creating organization ${createOrganizationDto.fullName}`,
    );

    const organization = await this.prisma.organization.create({
      data: {
        fullName: createOrganizationDto.fullName,
        label: createOrganizationDto.label,
        roles: {
          create: [
            {
              roleType: 'ORGADMIN',
              isAccepted: true,
              user: {
                connectOrCreate: {
                  where: { email: user.email },
                  create: { email: user.email },
                },
              },
            },
          ],
        },
        organizationSettings: {
          create: {
            expenseCategoryTree:
              defaultExpenseCategoryTree as unknown as Prisma.JsonArray,
          },
        },
      },
      include: { roles: true }, // used to redirect user to switch roles in frontend
    });

    return { organization, roleId: organization.roles[0].id };
  }

  async findOne({ id }: { id: string }) {
    const data = await this.prisma.organization.findUnique({ where: { id } });
    return data;
  }

  async remove({ id }: { id: string }) {
    return this.prisma.organization.delete({ where: { id } });
  }

  // ### SETTINGS ###
  async findSettings({ organizationId }: { organizationId: string }) {
    const data = await this.prisma.organizationSettings.findUnique({
      where: { organizationId },
    });
    return new OrganizationSettingsDto({
      ...data,
      expenseCategoryTree:
        data.expenseCategoryTree as unknown as ExpenseCategoryDto[],
    });
  }

  async updateSettings({
    organizationId,
    updateOrganizationSettingsDto,
  }: {
    organizationId: string;
    updateOrganizationSettingsDto: UpdateOrganizationSettingsDto;
  }) {
    return this.prisma.organizationSettings.update({
      where: { organizationId },
      data: {
        // TODO is this validated by class-validator?
        // @ts-ignore
        expenseCategoryTree: updateOrganizationSettingsDto.expenseCategoryTree,
      },
    });
  }

  async createExpenseCategory({
    organizationId,
    createExpenseCategoryDto,
  }: {
    organizationId: string;
    createExpenseCategoryDto: CreateExpenseCategoryDto;
  }) {
    // Reference: https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#advanced-example-update-a-nested-json-key-value
    const settings = await this.prisma.organizationSettings.findUnique({
      where: { organizationId },
      select: { expenseCategoryTree: true },
    });

    const categoriesJson = settings.expenseCategoryTree;

    if (
      categoriesJson &&
      typeof categoriesJson === 'object' &&
      Array.isArray(categoriesJson)
    ) {
      const categories = categoriesJson as Prisma.JsonArray;

      categories.push({
        ...createExpenseCategoryDto,
        id: generateId(),
      });

      const updated = await this.prisma.organizationSettings.update({
        where: { organizationId },
        data: { expenseCategoryTree: categories },
      });

      if (
        updated.expenseCategoryTree &&
        typeof updated.expenseCategoryTree === 'object' &&
        Array.isArray(updated.expenseCategoryTree)
      ) {
        return updated.expenseCategoryTree.length.toString();
      } else {
        this.logger.warn(
          'Failed to properly handle JSON value in expenseCategoryTree',
        );
        return 'ok';
      }
    } else {
      throw new InternalServerErrorException(
        'Failed to parse expenseCategoryTree',
      );
    }
  }
}
