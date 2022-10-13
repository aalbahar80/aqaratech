import { ForbiddenError, subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Action } from 'src/casl/action.enum';
import { frisk } from 'src/casl/frisk';
import { crumbs } from 'src/common/breadcrumb-select';
import { WithCount } from 'src/common/dto/paginated.dto';
import { parseLocationFilter } from 'src/common/parse-location-filter';
import { ExpenseCategoryDto } from 'src/expense-categories/expense-category.dto';
import { ExpensePageOptionsDto } from 'src/expenses/dto/expense-page-options.dto';
import {
	CreateExpenseDto,
	ExpenseDto,
	UpdateExpenseDto,
} from 'src/expenses/dto/expense.dto';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExpensesService {
	constructor(private readonly prisma: PrismaService) {}
	SubjectType = 'Expense' as const;

	async create({
		createExpenseDto,
		user,
	}: {
		createExpenseDto: CreateExpenseDto;
		user: IUser;
	}) {
		ForbiddenError.from(user.ability).throwUnlessCan(
			Action.Create,
			subject(this.SubjectType, createExpenseDto),
		);

		// VALIDATE EXPENSE CATEGORY

		if (createExpenseDto.categoryId) {
			await this.validateCategoryId(createExpenseDto.categoryId, user);
		}

		return this.prisma.expense.create({ data: createExpenseDto });
	}

	async findAll({
		pageOptionsDto,
		user,
	}: {
		pageOptionsDto: ExpensePageOptionsDto;
		user: IUser;
	}): Promise<WithCount<ExpenseDto>> {
		const { page, take, start, end, sortOrder, orderBy } = pageOptionsDto;

		// TODO use this instead:
		// const organizationId = user.role.organizationId;
		const organizationId = user.roles.find(
			(r) => r.id === user.xRoleId,
		)?.organizationId;

		const filter: Prisma.ExpenseWhereInput = {
			AND: [
				accessibleBy(user.ability, Action.Read).Expense,
				parseLocationFilter({ filter: pageOptionsDto, entity: 'Expense' }),
				{ postAt: { gte: start, lte: end } },
			],
		};

		const sort = orderBy
			? { [orderBy]: sortOrder }
			: { postAt: 'desc' as Prisma.SortOrder };

		const [data, total, settings] = await Promise.all([
			this.prisma.expense.findMany({
				take,
				skip: (page - 1) * take,
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
				where: { organizationId },
				select: { expenseCategoryTree: true },
			}),
		]);

		const tree =
			settings.expenseCategoryTree as unknown as ExpenseCategoryDto[];

		return { total, results: data.map((e) => new ExpenseDto(e, tree)) };
	}

	async findOne({ id, user }: { id: string; user: IUser }) {
		const organizationId = user.roles.find(
			(r) => r.id === user.xRoleId,
		)?.organizationId;

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
				where: { organizationId },
				select: { expenseCategoryTree: true },
			}),
		]);

		const tree =
			settings.expenseCategoryTree as unknown as ExpenseCategoryDto[];

		return new ExpenseDto(data, tree);
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
		ForbiddenError.from(user.ability).throwUnlessCan(
			Action.Update,
			subject(this.SubjectType, updateExpenseDto),
		);

		// VALIDATE EXPENSE CATEGORY
		if (updateExpenseDto.categoryId) {
			await this.validateCategoryId(updateExpenseDto.categoryId, user);
		}

		const frisked = frisk({
			user,
			SubjectType: this.SubjectType,
			instance: updateExpenseDto,
		});

		return this.prisma.expense.update({ where: { id }, data: frisked });
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
		// TODO use this instead:
		// const organizationId = user.role.organizationId;
		const organizationId = user.roles.find(
			(r) => r.id === user.xRoleId,
		)?.organizationId;

		const settings = await this.prisma.organizationSettings.findUniqueOrThrow({
			where: { organizationId },
			select: { expenseCategoryTree: true },
		});

		const categories = Array.isArray(settings.expenseCategoryTree)
			? settings.expenseCategoryTree
					.filter((e) => e)
					.map(
						(e) =>
							new ExpenseCategoryDto(
								e as unknown as Partial<ExpenseCategoryDto>,
							),
					)
			: [];

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
}
