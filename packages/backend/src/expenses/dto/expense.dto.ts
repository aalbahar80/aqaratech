import {
  ApiHideProperty,
  ApiProperty,
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { Expense } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import { IsOptional, IsPositive, IsString } from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import {
  BreadcrumbDto,
  BreadcrumbsDto,
  IBreadcrumbs,
} from 'src/common/dto/breadcrumb.dto';
import { Rel } from 'src/constants/rel.enum';
import { DateType } from 'src/decorators/date-type.decorator';
import { IsID } from 'src/decorators/field.decorators';
import { ExpenseCategoryDto } from 'src/expense-categories/expense-category.dto';

class ExpenseRequiredDto {
  @IsID()
  portfolioId: string;

  @IsPositive()
  amount: number;

  @DateType()
  postAt: Date;

  @IsString()
  memo: string | null;
}

class ExpenseOptionalDto {
  @IsID()
  @IsOptional()
  // TODO remove question mark?
  unitId?: string | null;

  @IsID()
  @IsOptional()
  // TODO remove question mark?
  propertyId?: string | null;

  // TODO remove from schema
  @IsID()
  @IsOptional()
  maintenanceOrderId: string | null;

  @IsString() // Use nanoid?
  @IsOptional()
  categoryId: string | null;
}

class ExpenseBreadcrumbsDto extends IntersectionType(
  PickType(BreadcrumbsDto, ['portfolio']),
  PartialType(PickType(BreadcrumbsDto, ['property', 'unit'])),
) {}

export class ExpenseDto extends IntersectionType(
  AbstractDto,
  IntersectionType(ExpenseRequiredDto, ExpenseOptionalDto),
) {
  constructor(partial: Partial<ExpenseDto>, tree?: ExpenseCategoryDto[]) {
    super();
    Object.assign(this, partial);

    if (tree && Array.isArray(tree) && this.categoryId) {
      const rawCategory = tree.find((c) => c.id === this.categoryId);
      if (rawCategory) {
        this.expenseType = new ExpenseCategoryDto(rawCategory);
      }
    }
  }

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

export class CreateExpenseDto
  extends IntersectionType(ExpenseRequiredDto, PartialType(ExpenseOptionalDto))
  implements Partial<Expense> {}

export class UpdateExpenseDto extends PartialType(
  OmitType(CreateExpenseDto, ['portfolioId']),
) {}
