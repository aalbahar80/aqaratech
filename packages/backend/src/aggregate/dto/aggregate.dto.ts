import { IsOptional } from 'class-validator';
import { DateType } from 'src/decorators/date-type.decorator';
import { IsID } from 'src/decorators/field.decorators';

export class ByMonthDto {
	amount: number;
	date: string;
}

export class DashboardFilterDto {
	@IsID()
	@IsOptional()
	portfolioId?: string;

	@IsID()
	@IsOptional()
	propertyId?: string;

	@IsID()
	@IsOptional()
	unitId?: string;

	@DateType(false)
	@IsOptional()
	start?: Date;

	@DateType(false)
	@IsOptional()
	end?: Date;
}
