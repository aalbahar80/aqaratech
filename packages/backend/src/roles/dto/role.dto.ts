import { ApiProperty } from '@nestjs/swagger';
import { Role, RoleType } from '@prisma/client';
import { RoleCreateSchema } from '@self/utils';

export class RoleDto implements Partial<Role> {
	id: string;
	createdAt: Date;
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
