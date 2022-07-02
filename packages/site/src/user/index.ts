import type { User } from '$lib/models/types/auth.type';
import { adminUser } from './user.admin';
import { ownerUser } from './user.owner';
import { tenantUser } from './user.tenant';
import { unauthenticatedUser } from './user.unauthenticated';

export const getUserConfig = (user?: User) => {
	if (!user) {
		return unauthenticatedUser;
	} else if (user.role.isAdmin) {
		return adminUser;
	} else if (user.role.isOwner) {
		return ownerUser;
	} else if (user.role.isTenant) {
		return tenantUser;
	} else {
		return unauthenticatedUser;
	}
};
