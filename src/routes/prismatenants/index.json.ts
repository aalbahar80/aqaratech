import { api } from '$routes/api/prisma';
import type { RequestEvent, RequestHandler } from '@sveltejs/kit';

// GET /todos.json
export const get: RequestHandler<Locals> = async (event) => {
	const response = await api(event);

	// if (response.status === 404) {
	// 	// user hasn't created a todo list.
	// 	// start with an empty array
	// 	return { body: [] };
	// }

	return response;
};

// POST /todos.json
export const post: RequestHandler<Locals, FormData> = async (event) => {
	const data = await event.request.formData();
	const response = await api(event, {
		// because index.svelte posts a FormData object,
		// request.body is _also_ a (readonly) FormData
		// object, which allows us to get form data
		// with the `body.get(key)` method
		first_name: data.get('first_name')?.toString() || null,
	});

	return response;
};
