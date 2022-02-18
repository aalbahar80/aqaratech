import prisma from '$lib/server/prismaClient';
import { unitData } from '$lib/definitions/select';
import { parseParams } from '$lib/utils/table-utils';
import type { Prisma } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit/types/endpoint';

export const get: RequestHandler<{ rows: any[] }> = async ({ url }) => {
	const {
		options: { skip, sortDir, sortKey },
	} = parseParams(url);

	const data = await prisma.unit.findMany({
		take: 10,
		skip,
		orderBy: { [sortKey]: sortDir as Prisma.SortOrder },
		select: unitData.select,
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
		const created = await prisma.unit.create({
			data,
			select: unitData.select,
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
