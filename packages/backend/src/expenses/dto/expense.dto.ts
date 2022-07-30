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
import { Nanoid } from 'src/decorators/field.decorators';
import { ExpenseCategoryDto } from 'src/organizations/dto/expenseCategory.dto';

class ExpenseRequiredDto {
  @Nanoid()
  portfolioId: string;

  @IsPositive()
  amount: number;

  @DateType()
  postAt: Date;

  @IsString()
  memo: string | null;
}

class ExpenseOptionalDto {
  @Nanoid()
  @IsOptional()
  // TODO remove question mark?
  unitId?: string | null;

  @Nanoid()
  @IsOptional()
  // TODO remove question mark?
  propertyId?: string | null;

  // TODO remove from schema
  @Nanoid()
  @IsOptional()
  maintenanceOrderId: string | null;

  // TODO use category name/prisma connect & set default here?
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
  expenseType: ExpenseCategoryDto | null;

  constructor(partial: Partial<ExpenseDto>) {
    super();
    Object.assign(this, partial);
  }

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
