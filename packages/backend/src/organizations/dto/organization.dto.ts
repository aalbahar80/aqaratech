import { ApiProperty } from '@nestjs/swagger';
import { OrganizationSchema, organizationSchema } from '@self/utils';
import { Expose } from 'class-transformer';
import { Exactly } from 'src/types/exactly.type';
import { z } from 'zod';

export class OrganizationDto implements z.infer<typeof organizationSchema> {
	@Expose()
	id: string;

	@Expose()
	fullName: string;

	@Expose()
	label?: string | null;

	@ApiProperty()
	@Expose()
	get title(): string {
		return this.label ?? this.fullName;
	}
}

export class CreateOrganizationDto
	implements Exactly<OrganizationSchema, CreateOrganizationDto>
{
	fullName: string;

	label?: string | null;
}

export class UpdateOrganizationDto extends CreateOrganizationDto {}

export class OrganizationCreatedDto {
	organization: OrganizationDto;
	roleId: string;
}
