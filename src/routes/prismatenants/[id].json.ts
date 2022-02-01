import { api } from '$routes/api/prisma';
import type { RequestHandler } from '@sveltejs/kit';

// PATCH /todos/:uid.json
export const patch: RequestHandler = async ({ request, locals, params }) => {
	return api(request, `prismatenants/${locals.userId}/${params.uid}`, {
		text: request.body?.get('text'),
		done: request.body?.has('done') ? !!request.body?.get('done') : undefined,
	});
};

// DELETE /todos/:uid.json
export const del: RequestHandler<Locals> = async ({
	request,
	locals,
	params,
}) => {
	return api(request, `todos/${locals.userId}/${params.uid}`);
};
