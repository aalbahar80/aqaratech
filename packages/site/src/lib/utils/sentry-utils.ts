import type { User } from '$lib/models/types/auth.type';

export const getSentryUser = (user: User | undefined) => ({
	id: user?.id || '',
	email: user?.email || '',
	username: user?.fullName || '',
	roleId: user?.role?.id || '',
});
