import {
	ApiHideProperty,
	ApiProperty,
	IntersectionType,
	OmitType,
	PartialType,
	PickType,
} from '@nestjs/swagger';
import { Property } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

import { PropertyCreateSchema, PropertyUpdateSchema } from '@self/utils';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import {
	BreadcrumbDto,
	BreadcrumbsDto,
	IBreadcrumbs,
} from 'src/common/dto/breadcrumb.dto';
import { NonComputed } from 'src/types/common.types';
import { Exactly } from 'src/types/exactly.type';

class PropertyRequiredDto {
	organizationId: string;

	portfolioId: string;

	area: string | null;
}

class PropertyOptionalDto {
	block: string | null;

	avenue: string | null;

	street: string | null;

	number: string | null;

	parcel: string | null;

	paci: string | null;

	cost: number | null;

	label: string | null;
}

class PropertyBreadcrumbsDto extends PickType(BreadcrumbsDto, [
	'portfolio',
	'property',
]) {}

export class PropertyDto
	extends IntersectionType(
		AbstractDto,
		IntersectionType(PropertyRequiredDto, PropertyOptionalDto),
	)
	implements Property
{
	constructor(data: NonComputed<PropertyDto>) {
		super();
		Object.assign(this, data);
	}

	title: string;

	@ApiHideProperty()
	@Exclude()
	portfolio: IBreadcrumbs['portfolio'];

	@ApiProperty()
	@Expose()
	get breadcrumbs(): PropertyBreadcrumbsDto {
		return {
			portfolio: new BreadcrumbDto({
				id: this.portfolioId,
				title: this.portfolio.title,
			}),
			property: new BreadcrumbDto({
				id: this.id,
				title: this.title,
			}),
		};
	}
}

export class CreatePropertyDto
	implements Exactly<PropertyCreateSchema, CreatePropertyDto>
{
	portfolioId: string;
	number: string;
	area: string;
	block: string;
	street: string;
	label?: string | null;
	avenue?: string | null;
	parcel?: string | null;
	paci?: string | null;
}

export class UpdatePropertyDto
	extends PartialType(OmitType(CreatePropertyDto, ['portfolioId']))
	implements Exactly<PropertyUpdateSchema, UpdatePropertyDto> {}
