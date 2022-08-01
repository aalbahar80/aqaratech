import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  CreateExpenseCategoryDto,
  ExpenseCategoryDto,
  UpdateAllExpenseCategoriesDto,
  UpdateExpenseCategoryDto,
} from 'src/expense-categories/expense-category.dto';
import { OrganizationSettingsDto } from 'src/organizations/dto/organizationSettings.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateId } from 'src/utils/get-nanoid';

@Injectable()
export class ExpenseCategoriesService {
  constructor(private prisma: PrismaService) {}

  private readonly logger = new Logger(ExpenseCategoriesService.name);

  async create({
    organizationId,
    createExpenseCategoryDto,
  }: {
    organizationId: string;
    createExpenseCategoryDto: CreateExpenseCategoryDto;
  }) {
    const categories = await this.fetchJsonCategories({ organizationId });

    categories.push({
      ...createExpenseCategoryDto,
      id: generateId(),
    });

    const updated = await this.prisma.organizationSettings.update({
      where: { organizationId },
      data: { expenseCategoryTree: categories },
    });

    const newCategories = this.validateJsonCategories({
      categories: updated.expenseCategoryTree,
    });

    return newCategories.length.toString();
  }

  async findAll({ organizationId }: { organizationId: string }) {
    const data = await this.prisma.organizationSettings.findUnique({
      where: { organizationId },
    });
    const settings = new OrganizationSettingsDto({
      ...data,
      expenseCategoryTree:
        data.expenseCategoryTree as unknown as ExpenseCategoryDto[],
    });
    return settings.expenseCategoryTree;
  }

  async updateAll({
    organizationId,
    updateAllExpenseCategoriesDto,
  }: {
    organizationId: string;
    updateAllExpenseCategoriesDto: UpdateAllExpenseCategoriesDto;
  }) {
    const categories = await this.fetchJsonCategories({ organizationId });

    categories.forEach((c) => {
      const category = c as Prisma.JsonObject;
      const changed = updateAllExpenseCategoriesDto.items.find(
        (item) => item.id === category.id,
      );
      // TODO if we add new fields to the ExpenseCategoryDto, we need to add them here
      if (changed) {
        category.parentId = changed.parentId;
        category.labelEn = changed.labelEn;
        category.labelAr = changed.labelAr;
        category.description = changed.description;
        category.isGroup = changed.isGroup;
      }
    });

    const updated = await this.prisma.organizationSettings.update({
      where: { organizationId },
      data: { expenseCategoryTree: categories },
    });

    const newCategories = this.validateJsonCategories({
      categories: updated.expenseCategoryTree,
    });

    return newCategories as unknown as ExpenseCategoryDto[];
  }

  findOne(id: number) {
    return `This action returns a #${id} expenseCategory`;
  }

  async update({
    organizationId,
    expenseCategoryId,
    updateExpenseCategoryDto,
  }: {
    organizationId: string;
    expenseCategoryId: string;
    updateExpenseCategoryDto: UpdateExpenseCategoryDto;
  }) {
    const categories = await this.fetchJsonCategories({ organizationId });

    categories.forEach((c) => {
      const category = c as Prisma.JsonObject;
      // TODO if we add new fields to the ExpenseCategoryDto, we need to add them here
      if (category.id === expenseCategoryId) {
        category.labelEn = updateExpenseCategoryDto.labelEn;
        category.labelAr = updateExpenseCategoryDto.labelAr;
        category.description = updateExpenseCategoryDto.description;
        category.isGroup = updateExpenseCategoryDto.isGroup;
      }
    });

    const updated = await this.prisma.organizationSettings.update({
      where: { organizationId },
      data: { expenseCategoryTree: categories },
    });

    this.validateJsonCategories({
      categories: updated.expenseCategoryTree,
    });

    return expenseCategoryId;
  }

  remove(id: number) {
    return `This action removes a #${id} expenseCategory`;
  }

  // HELPERS

  async fetchJsonCategories({ organizationId }: { organizationId: string }) {
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
      return categories;
    } else {
      throw new InternalServerErrorException(
        'Failed to parse expenseCategoryTree',
      );
    }
  }

  validateJsonCategories({ categories }: { categories: Prisma.JsonValue }) {
    if (
      categories &&
      typeof categories === 'object' &&
      Array.isArray(categories)
    ) {
      return categories;
    } else {
      this.logger.warn(
        'Failed to properly handle JSON value in expenseCategoryTree',
      );
      throw new InternalServerErrorException();
    }
  }
}
