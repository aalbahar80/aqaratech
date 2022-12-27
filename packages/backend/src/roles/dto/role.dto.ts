import { ApiProperty } from '@nestjs/swagger';
import { RoleType } from '@prisma/client';

import { RoleCreateSchema, RoleSchema } from '@self/utils';

import { Exactly } from 'src/types/exactly.type';

export class RoleDto implements Exactly<RoleSchema, RoleDto> {
	id: string;
	// FIX: add date
	// createdAt: Date;
	email: string;
	@ApiProperty({ enum: RoleType, enumName: 'RoleTypeEnum' })
	roleType: RoleType;
	organizationId: string;
	portfolioId: string | null;
	tenantId: string | null;
}

export class CreateRoleDto implements RoleCreateSchema {
	email: string;
}
