import prisma from '$lib/config/prisma';
import { select } from '$lib/definitions/Tenants';
import type { RequestHandler } from '@sveltejs/kit';

export const patch: RequestHandler = async (event) => {
	const data = await event.request.formData();
	const dob = data.get('dob')?.toString();
	const response = await prisma.tenant.update({
		where: {
			id: event.params.id,
		},
		data: {
			firstName: data.get('firstName')?.toString() || null,
			lastName: data.get('lastName')?.toString() || null,
			email: data.get('email')?.toString() || null,
			phone: data.get('phone')?.toString() || null,
			civilid: data.get('civilid')?.toString() || null,
			dob: dob ? new Date(dob) : null,
		},
		select,
	});

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
