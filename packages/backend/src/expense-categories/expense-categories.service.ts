import { ForbiddenError, subject } from '@casl/ability';
import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	Logger,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { expenseCategorySchema } from '@self/utils';
import { Action } from 'src/casl/action.enum';
import {
	CreateExpenseCategoryDto,
	ExpenseCategoryDto,
	UpdateExpenseCategoryDto,
	UpdateExpenseCategoryTreeDto,
} from 'src/expense-categories/expense-category.dto';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateId } from 'src/utils/generate-id';
import { z } from 'zod';

@Injectable()
export class ExpenseCategoriesService {
	constructor(private readonly prisma: PrismaService) {}
	SubjectType = 'Organization' as const;

	private readonly logger = new Logger(ExpenseCategoriesService.name);

	async create({
		organizationId,
		createExpenseCategoryDto,
		user,
	}: {
		organizationId: string;
		createExpenseCategoryDto: CreateExpenseCategoryDto;
		user: IUser;
	}) {
		ForbiddenError.from(user.ability).throwUnlessCan(
			Action.Update,
			subject(this.SubjectType, { id: organizationId }),
		);

		const categories = await this.fetchJsonCategories({ organizationId });

		const id = generateId();
		const newCategory = {
			...createExpenseCategoryDto,
			id,
		};

		categories.push(newCategory);

		const updated = await this.prisma.organizationSettings.update({
			where: { organizationId },
			data: { expenseCategoryTree: categories },
		});

		this.validateJsonCategories({
			categories: updated.expenseCategoryTree,
		});

		return expenseCategorySchema.parse(newCategory);
	}

	async findAll({ organizationId }: { organizationId: string }) {
		const data = await this.prisma.organizationSettings.findUniqueOrThrow({
			where: { organizationId },
		});

		const categories = expenseCategorySchema
			.array()
			.parse(data.expenseCategoryTree);

		return categories;
	}

	async updateAll({
		organizationId,
		updateExpenseCategoryTreeDto,
		user,
	}: {
		organizationId: string;
		updateExpenseCategoryTreeDto: UpdateExpenseCategoryTreeDto[];
		user: IUser;
	}) {
		ForbiddenError.from(user.ability).throwUnlessCan(
			Action.Update,
			subject(this.SubjectType, { id: organizationId }),
		);

		const categories = await this.fetchJsonCategories({ organizationId });

		// Currently, this applies the changes to all categories.
		categories.forEach((c) => {
			const category = c;
			const submitted = updateExpenseCategoryTreeDto.find(
				(item) => item.id === category['id'],
			);
			if (!submitted) {
				throw new BadRequestException({
					msg: `No expenseCategory with this id found in updateAll`,
					id: category['id'],
				});
			}
			this.applyChanges({
				original: category,
				submitted: submitted,
			});
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

	async update({
		organizationId,
		expenseCategoryId,
		updateExpenseCategoryDto,
		user,
	}: {
		organizationId: string;
		expenseCategoryId: string;
		updateExpenseCategoryDto: UpdateExpenseCategoryDto;
		user: IUser;
	}) {
		ForbiddenError.from(user.ability).throwUnlessCan(
			Action.Update,
			subject(this.SubjectType, { id: organizationId }),
		);

		const categories = await this.fetchJsonCategories({ organizationId });

		categories.forEach((c) => {
			const category = c;

			if (category['id'] === expenseCategoryId) {
				this.applyChanges({
					original: category,
					submitted: updateExpenseCategoryDto,
				});
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

	// HELPERS

	async fetchJsonCategories({ organizationId }: { organizationId: string }) {
		// Reference: https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#advanced-example-update-a-nested-json-key-value
		const settings = await this.prisma.organizationSettings.findUniqueOrThrow({
			where: { organizationId },
			select: { expenseCategoryTree: true },
		});

		const categoriesJson = settings.expenseCategoryTree;

		return expenseCategorySchema.array().parse(categoriesJson);
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

	applyChanges({
		original,
		submitted,
	}: {
		original: ExpenseCategoryDto;
		submitted: UpdateExpenseCategoryDto;
	}) {
		// submitted should not include any fields that are undefined
		const filtered = z
			.record(z.unknown().refine((v) => v !== undefined))
			.parse(submitted);

		return {
			...original,
			...filtered,
		};
	}
}
