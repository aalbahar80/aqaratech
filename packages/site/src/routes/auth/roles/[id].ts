import { getUser } from '$lib/server/utils/get-user';
import type { RequestHandler } from './__types/[id]';

export const GET: RequestHandler = async ({ locals, params }) => {
	const user = await getUser(locals.idToken, params.id);

	locals.xRoleId = user?.role.id || '';

	const location = user?.role.meta.home || '/';

	return {
		status: 302,
		headers: {
			location,
		},
	};
};
