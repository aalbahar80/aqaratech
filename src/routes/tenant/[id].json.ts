import prisma from '$lib/config/prisma';
import { tenantData } from '$lib/definitions/select';
import { formSchema } from '$lib/definitions/tenant';
import type { RequestHandler } from '@sveltejs/kit';

export const patch: RequestHandler = async (event) => {
	const data = await event.request.json();

	try {
		formSchema.parse(data);
		const updated = await prisma.tenant.update({
			where: { id: event.params.id },
			data,
			select: tenantData.select,
		});
		return {
			status: 200,
			body: updated,
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
	const deleted = await prisma.tenant.delete({
		where: {
			id: event.params.id,
		},
	});
	return {
		body: {
			message: 'Deleted',
			deleted,
		},
	};
};

export const get: RequestHandler = async (event) => {
	const data = await prisma.tenant.findUnique({
		where: {
			id: event.params.id,
		},
		select: tenantData.select,
	});
	return {
		body: data,
	};
};
