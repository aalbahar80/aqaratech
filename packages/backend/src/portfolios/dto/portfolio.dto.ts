import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger';
import { Portfolio } from '@prisma/client';
import { Expose } from 'class-transformer';
import { IsPhoneNumber, IsString, Length } from 'class-validator';

import { PortfolioCreateSchema, PortfolioUpdateSchema } from '@self/utils';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { DateType } from 'src/decorators/date-type.decorator';
import { IsID } from 'src/decorators/field.decorators';
import { Exactly } from 'src/types/exactly.type';

class PortfolioRequiredDto {
	@IsID()
	organizationId: string;

	@Length(1, 255)
	fullName: string;
}

class PortfolioOptionalDto {
	@IsString()
	label: string | null;

	@IsString()
	civilid: string | null;

	@IsPhoneNumber('KW')
	phone: string | null;

	@DateType(false)
	dob: Date | null;
}

export class PortfolioDto
	extends IntersectionType(
		AbstractDto,
		IntersectionType(PortfolioRequiredDto, PortfolioOptionalDto),
	)
	implements Portfolio
{
	constructor(partial: Partial<PortfolioDto>) {
		super();
		Object.assign(this, partial);
	}

	@ApiProperty()
	@Expose()
	get title(): string {
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
