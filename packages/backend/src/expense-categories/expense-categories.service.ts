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

    const id = generateId();
    categories.push({
      ...createExpenseCategoryDto,
      id,
    });

    const updated = await this.prisma.organizationSettings.update({
      where: { organizationId },
      data: { expenseCategoryTree: categories },
    });

    this.validateJsonCategories({
      categories: updated.expenseCategoryTree,
    });

    return id;
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
      if (category.id === expenseCategoryId) {
        this.logger.debug({ updateExpenseCategoryDto });
        this.logger.debug({ beforeUpdate: category });
        // TODO Use class-tranformer instead
        // only update the fields that exist in the DTO and are not undefined

        // TODO if we add new updateable fields to the ExpenseCategoryDto, we need to add them here
        const updatableKeys: (keyof UpdateExpenseCategoryDto)[] = [
          'parentId',
          'labelEn',
          'labelAr',
          'description',
        ];

        updatableKeys.forEach((key) => {
          if (
            key in updateExpenseCategoryDto &&
            updateExpenseCategoryDto[key] !== undefined
          ) {
            this.logger.debug(
              `updating ${key} from ${category[key]} to ${updateExpenseCategoryDto[key]}`,
            );
            category[key] = updateExpenseCategoryDto[key];
          }
        });
        this.logger.debug({ afterUpdate: category });
      }
    });

    const updated = await this.prisma.organizationSettings.update({
      where: { organizationId },
      data: { expenseCategoryTree: categories },
    });

    this.validateJsonCategories({
      categories: updated.expenseCategoryTree,
    });

    // TODO return the updated expenseCategory for easier testing
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
