import { z } from 'zod';

import { OrganizationSchema, organizationSchema } from '@self/utils';
import { OrganizationSettingsDto } from 'src/organizations/dto/organization-settings.dto';
import { Exactly } from 'src/types/exactly.type';

export class OrganizationDto implements z.infer<typeof organizationSchema> {
	id: string;

	fullName: string;

	label?: string | null;

	isActive: boolean;

	title: string;

	settings?: OrganizationSettingsDto;
}

export class CreateOrganizationDto
	implements Exactly<OrganizationSchema, CreateOrganizationDto>
{
	fullName: string;

	label?: string | null;
}

export class UpdateOrganizationDto extends CreateOrganizationDto {
	settings?: OrganizationSettingsDto;
}

export class OrganizationCreatedDto {
	organization: OrganizationDto;
	roleId: string;
}
