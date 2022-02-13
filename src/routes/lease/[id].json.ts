import prisma from '$lib/config/prisma';
import { formSchema } from '$lib/definitions/lease';
import { leaseData } from '$lib/definitions/select';
import type { RequestHandler } from '@sveltejs/kit';

export const patch: RequestHandler = async (event) => {
	const data = await event.request.json();

	try {
		formSchema.parse(data);
		const updated = await prisma.lease.update({
			where: { id: event.params.id },
			data,
			select: leaseData.select,
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
	const deleted = await prisma.lease.delete({
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
	const data = await prisma.lease.findUnique({
		where: {
			id: event.params.id,
		},
		select: leaseData.select,
	});
	return {
		body: data,
	};
};
