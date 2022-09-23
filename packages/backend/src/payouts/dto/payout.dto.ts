import {
	ApiHideProperty,
	ApiProperty,
	IntersectionType,
	PartialType,
	PickType,
} from '@nestjs/swagger';
import { Payout } from '@prisma/client';
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

export class CreatePayoutDto
	extends PayoutRequiredDto
	implements Partial<Payout> {}
export class UpdatePayoutDto extends PartialType(CreatePayoutDto) {}
