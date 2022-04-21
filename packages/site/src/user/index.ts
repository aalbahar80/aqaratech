import type { UserType } from '$models/interfaces/user.interface';
import { adminUser } from './user.admin';
import { getOwnerUser } from './user.owner';
import { tenantUser } from './user.tenant';
import { unauthenticatedUser } from './user.unauthenticated';

export const getUserConfig = (role?: UserType, id?: string) => {
	if (role === 'admin') {
		return adminUser;
	} else if (role === 'property-owner' && id) {
		return getOwnerUser(id);
	} else if (role === 'tenant') {
		return tenantUser;
	} else {
		return unauthenticatedUser;
	}
};
