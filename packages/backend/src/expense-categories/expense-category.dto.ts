import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsArray,
	IsBoolean,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator';
import { IsID } from 'src/decorators/field.decorators';

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

// The significance of having all properties marked as NON-optional in the main class is that
// this way, the generated sdk will not transfrom undefined to null when grabbing data.
export class CreateExpenseCategoryDto extends IntersectionType(
	PickType(ExpenseCategoryDto, ['labelEn', 'isGroup']),
	PartialType(
		PickType(ExpenseCategoryDto, ['parentId', 'labelAr', 'description']),
	),
) {}

export class UpdateExpenseCategoryDto extends IntersectionType(
	PickType(ExpenseCategoryDto, ['id']),
	PartialType(
		PickType(ExpenseCategoryDto, [
			'labelEn',
			'parentId',
			'labelAr',
			'description',
			'isGroup',
		]),
	),
) {}

export class UpdateAllExpenseCategoriesDto {
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => UpdateExpenseCategoryDto)
	items: UpdateExpenseCategoryDto[];
}
