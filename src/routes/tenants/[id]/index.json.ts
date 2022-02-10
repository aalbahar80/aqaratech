import prisma from '$lib/config/prisma';
import { formSchema, tenantData } from '$lib/definitions/Tenants';
import type { Prisma } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

export const patch: RequestHandler = async (event) => {
	type Updated = Prisma.TenantUpdateArgs['data'];
	const data: Updated = await event.request.json();

	try {
		formSchema.parse(data);
		if (data.dob) {
			data.dob = new Date(data.dob);
		}
		const tenant = await prisma.tenant.update({
			where: { id: event.params.id },
			data,
			select: tenantData.select,
		});
		return {
			status: 200,
			body: tenant,
		};
	} catch (error: any) {
		console.error(error);
		return {
			status: 400,
			body: {
				error: error.message,
			},
		};
	}
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

export const get: RequestHandler = async (event) => {
	const tenant = await prisma.tenant.findUnique({
		where: {
			id: event.params.id,
		},
		select: tenantData.select,
	});
	return {
		body: tenant,
	};
};
