import { PartialType } from '@nestjs/swagger';

import {
	PortfolioCreateSchema,
	PortfolioUpdateSchema,
	StringifyDateKeys,
} from '@self/utils';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { IOrganizationId, ITitle } from 'src/types/common.types';
import { Exactly } from 'src/types/exactly.type';

export class PortfolioDto
	extends AbstractDto
	implements
		Exactly<
			StringifyDateKeys<CreatePortfolioDto, 'dob'> &
				AbstractDto &
				IOrganizationId &
				ITitle,
			PortfolioDto
		>
{
	fullName: string;
	label: string | null;
	phone: string | null;
	civilid: string | null;
	dob: Date | null;

	organizationId: string;

	title: string;
}

export class CreatePortfolioDto
	implements Exactly<PortfolioCreateSchema, CreatePortfolioDto>
{
	fullName: string;
	label?: string | null;
	phone?: string | null;
	civilid?: string | null;
	dob?: string | null;
}

export class UpdatePortfolioDto
	extends PartialType(CreatePortfolioDto)
	implements Exactly<PortfolioUpdateSchema, UpdatePortfolioDto> {}
