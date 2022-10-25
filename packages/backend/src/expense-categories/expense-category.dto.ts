import { OmitType } from '@nestjs/swagger';
import {
	expenseCategoryCreateSchema,
	expenseCategorySchema,
	expenseCategoryTreeSchema,
	expenseCategoryUpdateSchema,
} from '@self/utils';
import { z } from 'zod';

export class ExpenseCategoryDto
	implements z.infer<typeof expenseCategorySchema>
{
	id: string;
	labelEn: string;
	labelAr?: string | null;
	description?: string | null;
	parentId?: string | null;
	isGroup: boolean;
}

export class CreateExpenseCategoryDto
	extends OmitType(ExpenseCategoryDto, ['id'])
	implements z.infer<typeof expenseCategoryCreateSchema> {}

export class UpdateExpenseCategoryDto
	extends OmitType(ExpenseCategoryDto, ['id', 'isGroup'])
	implements z.infer<typeof expenseCategoryUpdateSchema> {}

export class UpdateExpenseCategoryTreeDto
	extends OmitType(ExpenseCategoryDto, ['isGroup'])
	implements z.infer<typeof expenseCategoryTreeSchema['element']> {}
