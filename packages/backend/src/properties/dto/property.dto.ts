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
import {
	IsLatitude,
	IsLongitude,
	IsNumber,
	IsString,
	Length,
} from 'class-validator';

import { PropertyCreateSchema, PropertyUpdateSchema } from '@self/utils';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import {
	BreadcrumbDto,
	BreadcrumbsDto,
	IBreadcrumbs,
} from 'src/common/dto/breadcrumb.dto';
import { Rel } from 'src/constants/rel.enum';
import { IsID } from 'src/decorators/field.decorators';
import { Exactly } from 'src/types/exactly.type';

class PropertyRequiredDto {
	@IsID()
	organizationId: string;

	@IsID()
	portfolioId: string;

	@Length(1, 255)
	area: string | null;
}

class PropertyOptionalDto {
	@IsString()
	block: string | null;

	@IsString()
	avenue: string | null;

	@IsString()
	street: string | null;

	@IsString()
	number: string | null;

	@IsString()
	parcel: string | null;

	@IsString()
	paci: string | null;

	@IsNumber()
	cost: number | null;

	@IsString()
	label: string | null;

	@IsLongitude()
	long: number | null;

	@IsLatitude()
	lat: number | null;
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
	constructor(partial: Partial<PropertyDto>) {
		super();
		Object.assign(this, partial);
	}

	@ApiHideProperty()
	@Exclude()
	portfolio: IBreadcrumbs['portfolio'];

	@ApiProperty()
	@Expose()
	get address(): string {
		return [this.area, 'ق', this.block, 'م', this.number]
			.filter(Boolean)
			.join(' ');
	}

	@ApiProperty()
	@Expose()
	get title(): string {
		return this.label ?? this.address;
	}

	@ApiProperty()
	@Expose()
	get breadcrumbs(): PropertyBreadcrumbsDto {
		return {
			portfolio: new BreadcrumbDto({
				rel: Rel.Portfolio,
				...this.portfolio,
			}),
			property: new BreadcrumbDto({
				rel: Rel.Property,
				...this,
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
