import prisma from '$lib/config/prisma';
import { formSchema } from '$lib/definitions/client';
import { clientData } from '$lib/definitions/select';
import type { RequestHandler } from '@sveltejs/kit';

export const patch: RequestHandler = async (event) => {
	const data = await event.request.json();

	try {
		formSchema.parse(data);
		const updated = await prisma.client.update({
			where: { id: event.params.id },
			data,
			select: clientData.select,
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
	const deleted = await prisma.client.delete({
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
	const data = await prisma.client.findUnique({
		where: {
			id: event.params.id,
		},
		select: clientData.select,
	});
	return {
		body: data,
	};
};
