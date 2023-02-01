import { prisma } from '../prisma';

import type { Prisma, Role } from '@prisma/client';

type RoleInput = Pick<Role, 'organizationId' | 'roleType'> & {
	email: string;
	tenantId?: string | null;
	portfolioId?: string | null;
};

export const createRole = async (r: RoleInput) => {
	const data: Prisma.RoleCreateInput<unknown> = {
		user: {
			connectOrCreate: {
				where: { email: r.email },
				create: { email: r.email },
			},
		},
		organization: { connect: { id: r.organizationId } },
		roleType: r.roleType,
	};

	if (r.portfolioId && r.roleType === 'PORTFOLIO') {
		data.portfolio = { connect: { id: r.portfolioId } };
	} else if (r.tenantId && r.roleType === 'TENANT') {
		data.tenant = { connect: { id: r.tenantId } };
	}

	return await prisma.role.create({ data });
};
