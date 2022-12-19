import { OmitType } from '@nestjs/swagger';

import {
	ExpenseCategory,
	ExpenseCategoryCreateSchema,
	ExpenseCategoryTreeUpdateSchema,
	ExpenseCategoryUpdateSchema,
} from '@self/utils';

import { Exactly } from 'src/types/exactly.type';

export class ExpenseCategoryDto
	implements Exactly<ExpenseCategory, ExpenseCategoryDto>
{
	id: string;
	labelEn: string;
	labelAr: string | null;
	parentId: string | null;
	isGroup: boolean;
}

export class CreateExpenseCategoryDto
	implements Exactly<ExpenseCategoryCreateSchema, CreateExpenseCategoryDto>
{
	labelEn: string;
	labelAr?: string | null;
	parentId?: string | null;
	isGroup: boolean;
}

export class UpdateExpenseCategoryDto
	extends OmitType(CreateExpenseCategoryDto, ['isGroup'])
	implements Exactly<ExpenseCategoryUpdateSchema, UpdateExpenseCategoryDto> {}

export class UpdateExpenseCategoryTreeDto
	extends OmitType(ExpenseCategoryDto, ['isGroup'])
	implements
		Exactly<
			ExpenseCategoryTreeUpdateSchema[number],
			UpdateExpenseCategoryTreeDto
		> {}
