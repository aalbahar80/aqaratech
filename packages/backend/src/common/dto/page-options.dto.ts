// https://github.com/NarHakobyan/awesome-nest-boilerplate/blob/e12eac62d08bc107ae50fd814a6917c555d1884e/src/decorators/field.decorators.ts#L100
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsEnum, IsIn, IsJSON, IsObject, IsOptional } from 'class-validator';
import { SortOrder } from 'src/constants/sort-order.enum';
import {
  // EnumFieldOptional,
  NumberFieldOptional,
  StringFieldOptional,
} from '../../decorators/field.decorators';

const Combined = {
  // ...Prisma.UserScalarFieldEnum,
  // ...Prisma.OrganizationScalarFieldEnum,
  ...Prisma.TenantScalarFieldEnum,
  ...Prisma.PortfolioScalarFieldEnum,
  ...Prisma.PropertyScalarFieldEnum,
  ...Prisma.UnitScalarFieldEnum,
  ...Prisma.LeaseScalarFieldEnum,
  ...Prisma.LeaseInvoiceScalarFieldEnum,
  ...Prisma.ExpenseScalarFieldEnum,
  ...Prisma.MaintenanceOrderScalarFieldEnum,
};
export class PageOptionsDto {
  // @EnumFieldOptional(() => Order, {
  //   default: Order.ASC,
  // })
  // readonly order: Order = Order.ASC;

  @NumberFieldOptional({
    minimum: 1,
    default: 1,
    // int: true,
  })
  readonly page: number = 1;

  @NumberFieldOptional({
    minimum: 1,
    maximum: 50,
    default: 20,
    // int: true,
  })
  readonly take: number = 20;

  get skip(): number {
    return (this.page - 1) * this.take;
  }

  @StringFieldOptional()
  readonly q?: string;

  @ApiPropertyOptional({ enum: Combined, enumName: 'CombinedEnum' })
  @IsOptional()
  @IsIn(Object.keys(Combined), { message: 'Invalid orderBy field' })
  readonly orderBy?: string;

  @ApiPropertyOptional({ enum: SortOrder, enumName: 'SortOrderEnum' })
  @IsEnum(SortOrder)
  sortOrder: SortOrder = SortOrder.ASC;

  // @ApiPropertyOptional({ type: 'object' })
  // TODO parse to object
  @IsJSON()
  // @IsObject()
  @IsOptional()
  filter?: string;
}
