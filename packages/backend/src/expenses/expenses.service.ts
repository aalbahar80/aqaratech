import { accessibleBy } from '@casl/prisma';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Expense, Prisma } from '@prisma/client';
import { plainToInstance } from 'class-transformer';

import { expenseCategorySchema } from '@self/utils';

import { Action } from 'src/casl/action.enum';
import { crumbs } from 'src/common/breadcrumb-select';
import { WithCount } from 'src/common/dto/paginated.dto';
import { QueryOptionsDto } from 'src/common/dto/query-options.dto';
import {
	CreateExpenseDto,
	ExpenseDto,
	UpdateExpenseDto,
} from 'src/expenses/dto/expense.dto';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';

import { populateExpenseType } from './dto/populate-expense-type';

@Injectable()
export class ExpensesService {
	constructor(private readonly prisma: PrismaService) {}
	SubjectType = 'Expense' as const;

	async create({
		createExpenseDto,
		user,
		organizationId,
	}: {
		createExpenseDto: CreateExpenseDto;
		user: IUser;
		organizationId: string;
	}) {
		// VALIDATE EXPENSE CATEGORY

		if (createExpenseDto.categoryId) {
			await this.validateCategoryId(createExpenseDto.categoryId, user);
		}

		const { portfolioId, propertyId, unitId, ...data } = createExpenseDto;

		let expense: Expense;

		if (unitId) {
			expense = await this.prisma.expense.create({
				data: {
					...data,
					unit: {
						connect: { id: unitId, AND: [{ portfolioId }] },
					},
					portfolio: {
						connect: { id: portfolioId },
					},
					organization: {
						connect: { id: organizationId },
					},
				},
			});
		} else if (propertyId) {
			expense = await this.prisma.expense.create({
				data: {
					...data,
					property: {
						connect: { id: propertyId, AND: [{ portfolioId }] },
					},
					portfolio: {
						connect: { id: portfolioId },
					},
					organization: {
						connect: { id: organizationId },
					},
				},
			});
		} else {
			expense = await this.prisma.expense.create({
				data: {
					...data,
					portfolio: {
						connect: { id: portfolioId },
					},
					organization: {
						connect: { id: organizationId },
					},
				},
			});
		}

		return plainToInstance(ExpenseDto, expense);
	}

	async findAll({
		portfolioId,
		queryOptions,
		user,
	}: {
		portfolioId: string;
		queryOptions: QueryOptionsDto;
		user: IUser;
	}): Promise<WithCount<ExpenseDto>> {
		const { take, skip, sort } = queryOptions;

		const filter: Prisma.ExpenseWhereInput = {
			AND: [
				{ portfolioId },
				accessibleBy(user.ability, Action.Read).Expense,
				queryOptions.filter,
			],
		};

		const [data, total, settings] = await Promise.all([
			this.prisma.expense.findMany({
				take,
				skip,
				orderBy: sort,
				where: filter,
				include: {
					portfolio: crumbs.portfolio,
					property: crumbs.property,
					unit: crumbs.unit,
				},
			}),
			this.prisma.expense.count({ where: filter }),

			// TODO get from orgservice
			this.prisma.organizationSettings.findUniqueOrThrow({
				where: { organizationId: user.role.organizationId },
				select: { expenseCategoryTree: true },
			}),
		]);

		const results = plainToInstance(
			ExpenseDto,
			data.map((e) => populateExpenseType(e, settings.expenseCategoryTree)),
		);

		return { total, results: results };
	}

	async findOne({ id, user }: { id: string; user: IUser }) {
		const [data, settings] = await Promise.all([
			this.prisma.expense.findFirstOrThrow({
				where: {
					AND: [{ id }, accessibleBy(user.ability, Action.Read).Expense],
				},
				include: {
					portfolio: crumbs.portfolio,
					property: crumbs.property,
					unit: crumbs.unit,
				},
			}),

			// TODO get from orgservice
			this.prisma.organizationSettings.findUniqueOrThrow({
				where: { organizationId: user.role.organizationId },
				select: { expenseCategoryTree: true },
			}),
		]);

		const result = plainToInstance(
			ExpenseDto,
			populateExpenseType(data, settings.expenseCategoryTree),
		);

		return plainToInstance(ExpenseDto, result);
	}

	async update({
		id,
		updateExpenseDto,
		user,
	}: {
		id: string;
		updateExpenseDto: UpdateExpenseDto;
		user: IUser;
	}) {
		// VALIDATE EXPENSE CATEGORY
		if (updateExpenseDto.categoryId) {
			await this.validateCategoryId(updateExpenseDto.categoryId, user);
		}

		const expense = await this.prisma.expense.update({
			where: { id, AND: accessibleBy(user.ability, Action.Update).Expense },
			data: updateExpenseDto,
		});

		return plainToInstance(ExpenseDto, expense);
	}

	async remove({ id, user }: { id: string; user: IUser }) {
		const deleted = await this.prisma.expense.findFirstOrThrow({
			where: {
				AND: [{ id }, accessibleBy(user.ability, Action.Delete).Expense],
			},
			select: { id: true },
		});

		await this.prisma.expense.delete({ where: { id: deleted.id } });
		return deleted.id;
	}

	// ::: HELPERS :::

	async validateCategoryId(categoryId: string, user: IUser) {
		const settings = await this.prisma.organizationSettings.findUniqueOrThrow({
			where: { organizationId: user.role.organizationId },
			select: { expenseCategoryTree: true },
		});

		const categories = expenseCategorySchema
			.array()
			.parse(settings.expenseCategoryTree);

		// 1. Does the category exist?
		const category = categories.find((c) => c.id === categoryId);
		if (!category) {
			throw new BadRequestException('Expense Category does not exist');
		}

		// 2. Is the category a leaf node?
		if (category.isGroup) {
			throw new BadRequestException(
				'Invalid Expense Category. Must be a leaf node, not a group',
			);
		}
	}

	// TODO use satisfies type
	parseLocationFilter = (filter: {
		propertyId?: string | null;
		unitId?: string | null;
	}): Prisma.ExpenseWhereInput => {
		if (filter.unitId) {
			return {
				// Get expenses associated with the unit
				unitId: filter.unitId,
			};
		} else if (typeof filter.propertyId === 'string') {
			return {
				OR: [
					// Get expenses associated with the property directly
					{ propertyId: filter.propertyId },

					// OR

					// Get expenses associated with the property's units
					{
						unit: {
							propertyId: filter.propertyId,
						},
					},
				],
			};
		} else if (filter.propertyId === null) {
			// Get expenses which are not associated with any property
			return {
				propertyId: null,
				unitId: null,
			};
		} else {
			return {};
		}
	};
}
