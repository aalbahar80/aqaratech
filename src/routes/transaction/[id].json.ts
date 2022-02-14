import prisma from '$lib/config/prisma';
import { transactionData } from '$lib/definitions/select';
import type { RequestHandler } from '@sveltejs/kit';

export const patch: RequestHandler = async (event) => {
	const data = await event.request.json();

	try {
		const updated = await prisma.transaction.update({
			where: { id: event.params.id },
			data,
			select: transactionData.select,
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
	const deleted = await prisma.transaction.delete({
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
	const data = await prisma.transaction.findUnique({
		where: {
			id: event.params.id,
		},
		select: transactionData.select,
	});
	return {
		body: data,
	};
};
