import {
	ApiHideProperty,
	ApiProperty,
	IntersectionType,
	OmitType,
	PartialType,
	PickType,
} from '@nestjs/swagger';
import { Unit, UnitComputed } from '@prisma/client';
import { Exclude, Expose, Transform } from 'class-transformer';
import { formatDistance } from 'date-fns';

import { hasItems, UnitCreateSchema, UnitUpdateSchema } from '@self/utils';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import {
	BreadcrumbDto,
	BreadcrumbsDto,
	IBreadcrumbs,
} from 'src/common/dto/breadcrumb.dto';
import { NonComputed } from 'src/types/common.types';
import { Exactly } from 'src/types/exactly.type';

class UnitRequiredDto {
	organizationId: string;

	portfolioId: string;

	propertyId: string;

	unitNumber: string;
}

class UnitOptionalDto {
	floor: number | null;

	size: number | null;

	bed: number | null;

	bath: number | null;

	marketRent: number | null;

	type: string | null;

	usage: string | null;

	label: string | null;
}

// OutputDtos

export class UnitBreadcrumbsDto extends PickType(BreadcrumbsDto, [
	'portfolio',
	'property',
	'unit',
]) {}

export class UnitVacancy {
	isVacant: boolean;
	vacancyDistance: string;
	vacancyDate: Date;
}

export class UnitDto
	extends IntersectionType(
		AbstractDto,
		IntersectionType(UnitRequiredDto, UnitOptionalDto),
	)
	implements Unit
{
	constructor(data: Omit<NonComputed<UnitDto>, 'vacancy' | 'title'>) {
		super();
		Object.assign(this, data);
	}

	@Transform(({ obj }: { obj: ConstructorParameters<typeof UnitDto>[0] }) => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		return obj.computed!.title;
	})
	title: string;

	// Instead of exposing the computed property, we expose it's values as top-level properties.
	@ApiHideProperty()
	@Exclude()
	computed: Omit<UnitComputed, 'id' | 'titleScore'> | null; // HACK: Type Limitation

	@ApiHideProperty()
	@Exclude()
	leases: {
		start: Date;
		end: Date;
	}[];

	@ApiHideProperty()
	@Exclude()
	property: IBreadcrumbs['property'];

	@ApiProperty()
	@Expose()
	get vacancy(): UnitVacancy {
		const isOccupied = this.leases.some(
			(l) => l.start <= new Date() && l.end >= new Date(),
		);

		if (!hasItems(this.leases)) {
			return {
				isVacant: true,
				vacancyDate: this.createdAt,
				vacancyDistance: formatDistance(this.createdAt, new Date(), {
					addSuffix: true,
				}),
			};
		}

		const latestLease = this.leases[0]; // already sorted by end date

		const vacancyDistance = formatDistance(latestLease.end, new Date(), {
			addSuffix: true,
		});

		const data = {
			isVacant: !isOccupied,
			vacancyDistance,
			vacancyDate: latestLease.end,
		};
		return data;
	}

	@ApiProperty()
	@Expose()
	get breadcrumbs(): UnitBreadcrumbsDto {
		return {
			portfolio: new BreadcrumbDto({
				id: this.portfolioId,
				title: this.property.portfolio.title,
			}),
			property: new BreadcrumbDto({
				id: this.propertyId,
				title: this.property.title,
			}),
			unit: new BreadcrumbDto({
				id: this.id,
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				title: this.computed!.title,
			}),
		};
	}
}

export class CreateUnitDto implements Exactly<UnitCreateSchema, CreateUnitDto> {
	portfolioId: string;
	propertyId: string;
	unitNumber: string;
	marketRent?: number | null;
	label?: string | null;
	type?: string | null;
	bed?: number | null;
	bath?: number | null;
	size?: number | null;
	floor?: number | null;
	usage?: string | null;
}

export class UpdateUnitDto
	extends PartialType(OmitType(CreateUnitDto, ['portfolioId', 'propertyId']))
	implements Exactly<UnitUpdateSchema, UpdateUnitDto> {}

/**
 * For use in dropdowns
 */
export class UnitMinimalDto {
	id: string;
	unitNumber: CreateUnitDto['unitNumber'];
	propertyId: CreateUnitDto['propertyId'];

	// type: CreateUnitDto['type']; // resolves to generic 'object' in swagger
	type: string | null;
}
