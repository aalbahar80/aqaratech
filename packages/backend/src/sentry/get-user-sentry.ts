import { User } from '@sentry/node';
import { Request } from 'express';
import { AuthenticatedUser, IUser } from 'src/interfaces/user.interface';

export const getUserSentry = (request: Request) => {
	const user = request.user as IUser | AuthenticatedUser | undefined;

	let sentryUser: User = {
		ip_address: request.ip,
	};

	if (user && 'id' in user) {
		sentryUser = {
			...sentryUser,
			id: user.id,
			email: user.email,
			roleId: user.xRoleId,
			username: user.fullName ?? undefined,
			isAqaratechStaff: user.isAqaratechStaff,
		};
	} else if (user) {
		sentryUser = {
			...sentryUser,
			ip_address: request.ip,
			email: user.email,
			isAqaratechStaff: user.isAqaratechStaff,
		};
	}

	return sentryUser;
};
