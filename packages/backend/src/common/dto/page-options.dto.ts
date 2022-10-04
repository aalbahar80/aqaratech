// https://github.com/NarHakobyan/awesome-nest-boilerplate/blob/e12eac62d08bc107ae50fd814a6917c555d1884e/src/decorators/field.decorators.ts#L100
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsObject, IsOptional, IsString } from 'class-validator';
import { SortOrder } from 'src/constants/sort-order.enum';
import {
	// EnumFieldOptional,
	NumberFieldOptional,
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
		// maximum: 1000,
		default: 20,
		// int: true,
	})
	readonly take: number = 20;

	get skip(): number {
		return (this.page - 1) * this.take;
	}

	@IsString()
	@IsOptional()
	readonly orderBy?: string;

	@ApiPropertyOptional({ enum: SortOrder, enumName: 'SortOrderEnum' })
	@IsEnum(SortOrder)
	sortOrder: SortOrder = SortOrder.ASC;

	@ApiPropertyOptional({ type: 'object' })
	@Transform((value) => JSON.parse(value.value))
	@IsObject()
	@IsOptional()
	filter?: object;
}
