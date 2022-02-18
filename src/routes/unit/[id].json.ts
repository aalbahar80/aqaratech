import prisma from '$lib/server/prismaClient';
import { unitData } from '$lib/definitions/select';
import type { RequestHandler } from '@sveltejs/kit';

export const patch: RequestHandler = async (event) => {
	const data = await event.request.json();

	try {
		const updated = await prisma.unit.update({
			where: { id: event.params.id },
			data,
			select: unitData.select,
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
	const deleted = await prisma.unit.delete({
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
	const data = await prisma.unit.findUnique({
		where: {
			id: event.params.id,
		},
		select: unitData.select,
	});
	return {
		body: data,
	};
};
