import { getUser } from '$lib/server/utils/get-user';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, params }) => {
	if (!locals.accessToken) {
		// TODO monitor if this happens
		return json(
			{
				error: 'Unauthorized',
			},
			{
				status: 401,
			},
		);
	}

	const user = await getUser({
		token: locals.accessToken,
		selectedRoleId: params.id,
	});

	locals.xRoleId = user?.role?.id || '';

	const location = user?.role?.meta.home || '/';

	return new Response(undefined, {
		status: 302,
		headers: {
			location,
		},
	});
};
