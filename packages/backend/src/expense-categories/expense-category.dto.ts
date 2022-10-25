import { OmitType } from '@nestjs/swagger';
import {
	expenseCategoryCreateSchema,
	expenseCategoryTreeSchema,
	expenseCategoryUpdateSchema,
} from '@self/utils';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { IsID } from 'src/decorators/field.decorators';
import { z } from 'zod';

export class ExpenseCategoryDto {
	constructor(partial: Partial<ExpenseCategoryDto>) {
		Object.assign(this, partial);
	}
	@IsID()
	id: string;

	@IsString()
	labelEn: string;

	@IsString()
	@IsOptional()
	parentId: string | null;

	@IsString()
	@IsOptional()
	labelAr: string | null;

	@IsString()
	@IsOptional()
	description?: string | null;

	@IsBoolean()
	isGroup: boolean;
}

export class CreateExpenseCategoryDto
	implements z.infer<typeof expenseCategoryCreateSchema>
{
	labelEn: string;
	labelAr?: string | null;
	description?: string | null;
	parentId?: string | null;
	isGroup: boolean;
}

export class UpdateExpenseCategoryDto
	extends OmitType(CreateExpenseCategoryDto, ['isGroup'])
	implements z.infer<typeof expenseCategoryUpdateSchema> {}

export class UpdateExpenseCategoryTreeDto
	extends OmitType(CreateExpenseCategoryDto, ['isGroup'])
	implements z.infer<typeof expenseCategoryTreeSchema['element']>
{
	id: string;
}
