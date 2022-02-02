import { api } from '$routes/api/prisma';
import type { RequestHandler } from '@sveltejs/kit';

// PATCH /todos/:uid.json
export const patch: RequestHandler = async (event) => {
	const data = await event.request.formData();
	return api(event, {
		first_name: data.get('first_name')?.toString() || undefined,
		is_ok: data.has('is_ok') ? !!data.get('is_ok') : undefined,
	});
};

// DELETE /todos/:uid.json
export const del: RequestHandler = async (event) => {
	return api(event);
};
