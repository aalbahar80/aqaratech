import type { ValidatedRoleDto } from '$api/openapi';
import type { User } from '$lib/models/types/auth.type';
import { getRoleMeta } from '$lib/utils/get-role-meta';

export const getDefaultRole = (roles: ValidatedRoleDto[]): User['role'] => {
	const defaultRole = roles.find((role) => role.isDefault) || roles[0];

	if (!defaultRole) {
		return undefined;
	} else {
		return {
			...defaultRole,
			meta: getRoleMeta(defaultRole),
		};
	}
};
