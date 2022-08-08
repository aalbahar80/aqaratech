import { getUser } from '$lib/server/utils/get-user';
import type { RequestHandler } from './__types/[id]';

export const GET: RequestHandler = async ({ locals, params }) => {
	if (!locals.accessToken) {
		// TODO monitor if this happens
		return {
			status: 401,
			body: {
				error: 'Unauthorized',
			},
		};
	}

	const user = await getUser({
		token: locals.accessToken,
		selectedRoleId: params.id,
	});

	locals.xRoleId = user?.role?.id || '';

	const location = user?.role?.meta.home || '/';

	return {
		status: 302,
		headers: {
			location,
		},
	};
};
