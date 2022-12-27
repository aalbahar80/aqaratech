import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { TenantCreateSchema, TenantUpdateSchema } from '@self/utils';

import { AbstractDto } from 'src/common/dto/abstract.dto';
import { IOrganizationId, ITitle } from 'src/types/common.types';
import { Exactly } from 'src/types/exactly.type';

// change z.input after creating validation pipe
// Doesn't error if we add extra fields, is there a version of implement that does?
export class CreateTenantDto
	implements Exactly<TenantCreateSchema, CreateTenantDto>
{
	fullName: string;
	label?: string | null;
	civilid?: string | null;
	phone?: string | null;
	dob?: string | null;
	nationality?: string | null;
	passportNum?: string | null;
	residencyEnd?: string | null;
	residencyNum?: string | null;
}

export class UpdateTenantDto
	extends PartialType(CreateTenantDto)
	implements Exactly<TenantUpdateSchema, UpdateTenantDto> {}

export class TenantDto
	extends AbstractDto
	implements
		Exactly<
			TenantCreateSchema & AbstractDto & IOrganizationId & ITitle,
			TenantDto
		>
{
	fullName: string;
	label: string | null;
	civilid: string | null;
	phone: string | null;
	dob: string | null;
	nationality: string | null;
	passportNum: string | null;
	residencyEnd: string | null;
	residencyNum: string | null;

	organizationId: string;

	@ApiProperty()
	@Expose()
	get title(): string {
		return this.label ?? this.fullName;
	}
}
