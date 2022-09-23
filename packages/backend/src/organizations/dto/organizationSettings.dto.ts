import { Type } from 'class-transformer';
import { IsArray } from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { ExpenseCategoryDto } from 'src/expense-categories/expense-category.dto';

export class OrganizationSettingsDto extends AbstractDto {
	constructor(partial: Partial<OrganizationSettingsDto>) {
		super();
		Object.assign(this, partial);
	}
	@IsArray()
	@Type(() => ExpenseCategoryDto)
	expenseCategoryTree: ExpenseCategoryDto[];
	organizationId: string;
}
