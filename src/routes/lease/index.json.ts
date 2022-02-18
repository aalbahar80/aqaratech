import prisma from '$lib/server/prismaClient';
import { formSchema } from '$lib/definitions/lease';
import { leaseData } from '$lib/definitions/select';
import { parseParams } from '$lib/utils/table-utils';
import type { Prisma } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit/types/endpoint';

export const get: RequestHandler<{ rows: any[] }> = async ({ url }) => {
	const {
		options: { skip, sortDir, sortKey },
	} = parseParams(url);

	const data = await prisma.lease.findMany({
		take: 10,
		skip,
		orderBy: { [sortKey]: sortDir as Prisma.SortOrder },
		select: leaseData.select,
	});

	return {
		body: {
			rows: data,
		},
	};
};

export const post: RequestHandler = async (event) => {
	const data = await event.request.json();

	try {
		formSchema.parse(data);
		const created = await prisma.lease.create({
			data,
			select: leaseData.select,
		});
		return {
			status: 200,
			body: created,
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
