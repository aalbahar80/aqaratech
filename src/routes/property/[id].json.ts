import prisma from '$lib/config/prisma';
import { formSchema, entityData } from '$lib/definitions/property';
import type { Prisma } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

export const patch: RequestHandler = async (event) => {
	type Updated = Prisma.PropertyUpdateArgs['data'];
	const data: Updated = await event.request.json();
	console.log({ data }, 'index.json.ts ~ 12');

	try {
		formSchema.parse(data);
		const updated = await prisma.property.update({
			where: { id: event.params.id },
			data,
			select: entityData.select,
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
	const deleted = await prisma.property.delete({
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
	const data = await prisma.property.findUnique({
		where: {
			id: event.params.id,
		},
		select: entityData.select,
	});
	return {
		body: data,
	};
};
