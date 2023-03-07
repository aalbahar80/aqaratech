import { OrganizationSettingsSchema } from '@self/utils/src/schemas';
import { Exactly } from 'src/types/exactly.type';

export class DueDurationDto {
	months: number;
	days: number;
}

export class OrganizationSettingsDto implements OrganizationSettingsSchema {
	dueDuration: DueDurationDto;
}

export class UpdateOrganizationSettingsDto
	implements Exactly<OrganizationSettingsSchema, UpdateOrganizationSettingsDto>
{
	dueDuration?: DueDurationDto;
}
