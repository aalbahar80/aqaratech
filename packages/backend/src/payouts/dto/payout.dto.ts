import {
	ApiHideProperty,
	ApiProperty,
	IntersectionType,
	PickType,
} from '@nestjs/swagger';
import { Payout } from '@prisma/client';
import { payoutCreateSchema } from '@self/utils';
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
import { z } from 'zod';

class PayoutRequiredDto {
	@IsID()
	organizationId: string;

	@IsID()
	portfolioId: string;

	@IsPositive()
	amount: number;

	@DateType()
	postAt: Date;

	@IsOptional()
	@IsString()
	memo?: string | null;
}

class PayoutBreadcrumbsDto extends PickType(BreadcrumbsDto, ['portfolio']) {}

export class PayoutDto
	extends IntersectionType(AbstractDto, PayoutRequiredDto)
	implements Partial<Payout>
{
	constructor(partial: Partial<PayoutDto>) {
		super();
		Object.assign(this, partial);
	}

	@ApiHideProperty()
	@Exclude()
	portfolio: IBreadcrumbs['portfolio'];

	@ApiProperty()
	@Expose()
	get breadcrumbs(): PayoutBreadcrumbsDto {
		return {
			portfolio: new BreadcrumbDto({
				rel: Rel.Portfolio,
				...this.portfolio,
			}),
		};
	}
}

export class CreatePayoutDto implements z.infer<typeof payoutCreateSchema> {
	portfolioId: string;
	amount: number;
	postAt: string;
	memo?: string | null;
}
