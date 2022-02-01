import { api } from '$routes/api/prisma';
import type { RequestHandler } from '@sveltejs/kit';

// GET /todos.json
export const get: RequestHandler<Locals> = async (request) => {
	// request.locals.userid comes from src/hooks.js
	const response = await api(request, `prismatenants/${request.locals.userId}`);

	if (response.status === 404) {
		// user hasn't created a todo list.
		// start with an empty array
		return { body: [] };
	}

	return response;
};
