import {
	ApiHideProperty,
	ApiProperty,
	IntersectionType,
	OmitType,
	PartialType,
	PickType,
} from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

import { ExpenseCreateSchema, ExpenseUpdateSchema } from '@self/utils';

import { AbstractDto } from 'src/common/dto/abstract.dto';
import {
	BreadcrumbDto,
	BreadcrumbsDto,
	IBreadcrumbs,
} from 'src/common/dto/breadcrumb.dto';
import { Rel } from 'src/constants/rel.enum';
import { ExpenseCategoryDto } from 'src/expense-categories/expense-category.dto';
import { Exactly } from 'src/types/exactly.type';

class ExpenseBreadcrumbsDto extends IntersectionType(
	PickType(BreadcrumbsDto, ['portfolio']),
	PartialType(PickType(BreadcrumbsDto, ['property', 'unit'])),
) {}

export class ExpenseDto
	extends AbstractDto
	implements Exactly<ExpenseCreateSchema, CreateExpenseDto>
{
	portfolioId: string;
	propertyId: string | null;
	unitId: string | null;
	amount: number;
	postAt: string;
	categoryId: string | null;
	memo: string | null;
	label: string | null;

	organizationId: string;

	@ApiProperty()
	@Expose()
	expenseType: ExpenseCategoryDto | null;

	@ApiHideProperty()
	@Exclude()
	portfolio: IBreadcrumbs['portfolio'];

	@ApiHideProperty()
	@Exclude()
	property: IBreadcrumbs['property'] | null;

	@ApiHideProperty()
	@Exclude()
	unit: IBreadcrumbs['unit'] | null;

	@ApiProperty()
	@Expose()
	get breadcrumbs(): ExpenseBreadcrumbsDto {
		const crumbs: ExpenseBreadcrumbsDto = {
			portfolio: new BreadcrumbDto({
				rel: Rel.Portfolio,
				...this.portfolio,
			}),
		};

		if (this.property) {
			crumbs.property = new BreadcrumbDto({
				rel: Rel.Property,
				...this.property,
			});
		}

		if (this.unit) {
			crumbs.unit = new BreadcrumbDto({
				rel: Rel.Unit,
				...this.unit,
			});
		}

		return crumbs;
	}
}

export class PartialExpenseDto extends PartialType(ExpenseDto) {}

export class CreateExpenseDto
	implements Exactly<ExpenseCreateSchema, CreateExpenseDto>
{
	portfolioId: string;
	propertyId: string | null;
	unitId: string | null;
	amount: number;
	postAt: string;
	categoryId?: string | null;
	memo?: string | null;
	label?: string | null;
}

export class UpdateExpenseDto
	extends PartialType(
		OmitType(CreateExpenseDto, ['portfolioId', 'propertyId', 'unitId']),
	)
	implements Exactly<ExpenseUpdateSchema, UpdateExpenseDto> {}
