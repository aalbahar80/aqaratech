import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { Tenant } from '@prisma/client';
import { Expose } from 'class-transformer';
import {
	IsISO31661Alpha3,
	IsPhoneNumber,
	IsString,
	Length,
} from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { DateType } from 'src/decorators/date-type.decorator';
import { IsID } from 'src/decorators/field.decorators';

class TenantRequiredDto {
	@IsID()
	organizationId: string;

	@Length(1, 255)
	fullName: string;
}

export class TenantOptionalDto {
	@IsString()
	label: string | null;

	@IsString()
	civilid: string | null;

	@IsPhoneNumber('KW')
	phone: string | null;

	@DateType(false)
	dob: Date | null;

	@IsString()
	passportNum: string | null;

	@IsISO31661Alpha3()
	nationality: string | null;

	@IsString()
	residencyNum: string | null;

	@DateType(false)
	residencyEnd: Date | null;
}

export class TenantDto
	extends IntersectionType(
		AbstractDto,
		IntersectionType(TenantRequiredDto, TenantOptionalDto),
	)
	implements Tenant
{
	constructor(partial: Partial<TenantDto>) {
		super();
		Object.assign(this, partial);
	}

	@ApiProperty()
	@Expose()
	get title(): string {
		return this.label ?? this.fullName;
	}
}
