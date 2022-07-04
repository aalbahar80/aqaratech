// https://github.com/NarHakobyan/awesome-nest-boilerplate/blob/e12eac62d08bc107ae50fd814a6917c555d1884e/src/decorators/field.decorators.ts#L100
import { SortOrder } from 'src/constants/sort-order.enum';
import {
  // EnumFieldOptional,
  NumberFieldOptional,
  StringFieldOptional,
} from '../../decorators/field.decorators';

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
    default: 10,
    // int: true,
  })
  readonly take: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }

  @StringFieldOptional()
  readonly q?: string;

  readonly orderBy?: string;

  readonly sortOrder: SortOrder = SortOrder.ASC;
}
