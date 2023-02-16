import { z } from 'zod';

import { OrganizationSchema, organizationSchema } from '@self/utils';
import { Exactly } from 'src/types/exactly.type';

export class OrganizationDto implements z.infer<typeof organizationSchema> {
	id: string;

	fullName: string;

	label?: string | null;

	title: string;
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
