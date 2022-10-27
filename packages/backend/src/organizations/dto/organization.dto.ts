import { ApiProperty } from '@nestjs/swagger';
import { organizationSchema } from '@self/utils';
import { Expose } from 'class-transformer';
import { z } from 'zod';

export class OrganizationDto implements z.infer<typeof organizationSchema> {
	fullName: string;

	label?: string | null;

	@ApiProperty()
	@Expose()
	get title(): string {
		return this.label ?? this.fullName;
	}
}

export class OrganizationCreatedDto {
	organization: OrganizationDto;
	roleId: string;
}
