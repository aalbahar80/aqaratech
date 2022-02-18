import prisma from '$lib/server/prismaClient';
import { formSchema } from '$lib/definitions/property';
import { propertyData } from '$lib/definitions/select';
import type { RequestHandler } from '@sveltejs/kit';

export const patch: RequestHandler = async (event) => {
	const data = await event.request.json();

	try {
		formSchema.parse(data);
		const updated = await prisma.property.update({
			where: { id: event.params.id },
			data,
			select: propertyData.select,
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
		select: propertyData.select,
	});
	return {
		body: data,
	};
};
