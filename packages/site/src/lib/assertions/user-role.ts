import type { User, UserWithRole } from '$lib/models/types/auth.type';

export function assertRole(
	user: User | undefined,
): asserts user is UserWithRole {
	if (!user?.role) {
		throw new Error('User role assertion failed');
	}
}
