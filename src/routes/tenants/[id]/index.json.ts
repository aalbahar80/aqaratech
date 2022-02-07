import type { RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/config/prisma';

export const patch: RequestHandler = async (event) => {
	const data = await event.request.formData();
	const response = await prisma.tenant.update({
		where: {
			id: event.params.id,
			// id: '25e28e6a-20bd-4ac4-ac61-dd52385e5c4e',
		},
		data: {
			firstName: data.get('firstName')?.toString() || null,
			lastName: data.get('lastName')?.toString() || null,
			email: data.get('email')?.toString() || null,
			phone: data.get('phone')?.toString() || null,
			civilid: data.get('civilid')?.toString() || null,
		},
	});

	console.log(response);

	return {
		body: response,
	};
};
