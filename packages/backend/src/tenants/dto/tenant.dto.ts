import { PartialType } from '@nestjs/swagger';

import {
	StringifyDateKeys,
	TenantCreateSchema,
	TenantUpdateSchema,
} from '@self/utils';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { IOrganizationId, ITitle } from 'src/types/common.types';
import { Exactly } from 'src/types/exactly.type';

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
			StringifyDateKeys<TenantCreateSchema, 'dob' | 'residencyEnd'> &
				AbstractDto &
				IOrganizationId &
				ITitle,
			TenantDto
		>
{
	fullName: string;
	label: string | null;
	civilid: string | null;
	phone: string | null;
	dob: Date | null;
	nationality: string | null;
	passportNum: string | null;
	residencyEnd: Date | null;
	residencyNum: string | null;

	organizationId: string;

	title: string;
}
