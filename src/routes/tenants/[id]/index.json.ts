import prisma from '$lib/config/prisma';
import { select } from '$lib/definitions/Tenants';
import type { RequestHandler } from '@sveltejs/kit';

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
		select,
	});

	console.log(response);

	return {
		body: response,
	};
};

export const del: RequestHandler = async (event) => {
	// return api(event, `todos/${event.locals.userid}/${event.params.uid}`);
	const tenant = await prisma.tenant.delete({
		where: {
			id: event.params.id,
		},
	});
	return {
		body: {
			message: 'Deleted',
			tenant,
		},
	};
};
