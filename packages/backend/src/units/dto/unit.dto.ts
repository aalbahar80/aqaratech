import {
	ApiHideProperty,
	ApiProperty,
	IntersectionType,
	OmitType,
	PartialType,
	PickType,
} from '@nestjs/swagger';
import { Unit } from '@prisma/client';
import { getUnitLabel, UnitCreateSchema, UnitUpdateSchema } from '@self/utils';
import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsPositive, IsString, Length } from 'class-validator';
import { formatDistance } from 'date-fns';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import {
	BreadcrumbDto,
	BreadcrumbsDto,
	IBreadcrumbs,
} from 'src/common/dto/breadcrumb.dto';
import { Rel } from 'src/constants/rel.enum';
import { IsID } from 'src/decorators/field.decorators';
import { PropertyDto } from 'src/properties/dto/property.dto';
import { Exactly } from 'src/types/exactly.type';

class UnitRequiredDto {
	@IsID()
	organizationId: string;

	@IsID()
	portfolioId: string;

	@IsID()
	propertyId: string;

	@Length(1, 255)
	unitNumber: string;
}

class UnitOptionalDto {
	@IsNumber()
	floor: number | null;

	@IsPositive()
	size: number | null;

	@IsPositive()
	bed: number | null;

	@IsPositive()
	bath: number | null;

	@IsPositive()
	marketRent: number | null;

	@IsString()
	type: string | null;

	@IsString()
	usage: string | null;

	@IsString()
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
	constructor(partial: Partial<UnitDto>) {
		super();
		Object.assign(this, partial);
	}

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
	get title(): string {
		return (
			this.label ??
			getUnitLabel({ type: this.type, unitNumber: this.unitNumber })
		);
	}

	@ApiProperty()
	@Expose()
	get vacancy(): UnitVacancy {
		const isOccupied = this.leases.some(
			(l) => l.start <= new Date() && l.end >= new Date(),
		);

		if (!this.leases.length) {
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
		const property = new PropertyDto(this.property);
		return {
			portfolio: property.breadcrumbs.portfolio,
			property: property.breadcrumbs.property,
			unit: new BreadcrumbDto({
				rel: Rel.Unit,
				...this,
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

export class PartialUnitDto extends PartialType(UnitDto) {}
