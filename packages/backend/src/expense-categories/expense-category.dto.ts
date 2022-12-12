import { OmitType } from '@nestjs/swagger';

import {
	ExpenseCategoryCreateSchema,
	ExpenseCategoryTreeSchema,
	ExpenseCategoryUpdateSchema,
} from '@self/utils';

import { Exactly } from 'src/types/exactly.type';

export class ExpenseCategoryDto implements ExpenseCategoryCreateSchema {
	id: string;
	labelEn: string;
	labelAr?: string | null;
	description?: string | null;
	parentId?: string | null;
	isGroup: boolean;
}

export class CreateExpenseCategoryDto
	extends OmitType(ExpenseCategoryDto, ['id'])
	implements Exactly<ExpenseCategoryCreateSchema, CreateExpenseCategoryDto> {}

export class UpdateExpenseCategoryDto
	extends OmitType(ExpenseCategoryDto, ['id', 'isGroup'])
	implements Exactly<ExpenseCategoryUpdateSchema, UpdateExpenseCategoryDto> {}

export class UpdateExpenseCategoryTreeDto
	extends OmitType(ExpenseCategoryDto, ['isGroup'])
	implements
		Exactly<ExpenseCategoryTreeSchema[number], UpdateExpenseCategoryTreeDto> {}
