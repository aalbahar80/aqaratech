import {
	ApiHideProperty,
	ApiProperty,
	IntersectionType,
	PickType,
} from '@nestjs/swagger';
import { Payout } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

import { PayoutCreateSchema } from '@self/utils';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import {
	BreadcrumbDto,
	BreadcrumbsDto,
	IBreadcrumbs,
} from 'src/common/dto/breadcrumb.dto';
import { NonComputed } from 'src/types/common.types';
import { Exactly } from 'src/types/exactly.type';

class PayoutRequiredDto {
	organizationId: string;

	portfolioId: string;

	amount: number;

	postAt: Date;

	memo?: string | null;
}

class PayoutBreadcrumbsDto extends PickType(BreadcrumbsDto, ['portfolio']) {}

export class PayoutDto
	extends IntersectionType(AbstractDto, PayoutRequiredDto)
	implements Partial<Payout>
{
	constructor(data: NonComputed<PayoutDto>) {
		super();
		Object.assign(this, data);
	}

	@ApiHideProperty()
	@Exclude()
	portfolio: IBreadcrumbs['portfolio'];

	@ApiProperty()
	@Expose()
	get breadcrumbs(): PayoutBreadcrumbsDto {
		return {
			portfolio: new BreadcrumbDto({
				id: this.portfolioId,
				title: this.portfolio.title,
			}),
		};
	}
}

export class CreatePayoutDto
	implements Exactly<PayoutCreateSchema, CreatePayoutDto>
{
	portfolioId: string;
	amount: number;
	postAt: string;
	memo?: string | null;
}
