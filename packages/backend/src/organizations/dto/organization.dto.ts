import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger';
import { Organization } from '@prisma/client';
import { Expose } from 'class-transformer';
import { IsString, Length } from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';

class OrganizationRequiredDto {
	@Length(3, 100)
	fullName: string;
}

class OrganizationOptionalDto {
	@IsString()
	label: string | null;
}

export class OrganizationDto extends IntersectionType(
	AbstractDto,
	IntersectionType(OrganizationRequiredDto, OrganizationOptionalDto),
) {
	constructor(partial: Partial<OrganizationDto>) {
		super();
		Object.assign(this, partial);
	}

	@ApiProperty()
	@Expose()
	get title(): string {
		return this.label || this.fullName;
	}
}

export class CreateOrganizationDto
	extends IntersectionType(
		OrganizationRequiredDto,
		PartialType(OrganizationOptionalDto),
	)
	implements Partial<Organization> {}

export class UpdateOrganizationDto extends PartialType(CreateOrganizationDto) {}

export class OrganizationCreatedDto {
	organization: OrganizationDto;
	roleId: string;
}
