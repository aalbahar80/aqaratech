import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { PortfolioCreateSchema, PortfolioUpdateSchema } from '@self/utils';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { Exactly } from 'src/types/exactly.type';

export class PortfolioDto
	extends AbstractDto
	implements Exactly<PortfolioCreateSchema, CreatePortfolioDto>
{
	fullName: string;
	label: string | null;
	phone: string | null;
	civilid: string | null;
	dob: string | null;

	organizationId: string;

	@ApiProperty()
	@Expose()
	get title(): string {
		// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
		return this.label || this.fullName;
	}
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
