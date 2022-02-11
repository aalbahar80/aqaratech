import prisma from '$lib/config/prisma';
import { entityData } from '$lib/definitions/unit';
import { parseParams } from '$lib/utils/table-utils';
import type { Prisma } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit/types/endpoint';

export const get: RequestHandler<{ rows: any[] }> = async ({ url }) => {
	const {
		options: { search, skip, sortDir, sortKey },
	} = parseParams(url);

	const data = await prisma.unit.findMany({
		take: 10,
		skip,
		orderBy: { [sortKey]: sortDir as Prisma.SortOrder },
		select: entityData.select,
	});

	// This is a hack to avoid the date to be reformatted during hydration
	// which causes fluttering
	const rows = JSON.parse(JSON.stringify(data));
	return {
		body: {
			rows,
		},
	};
};

export const post: RequestHandler = async (event) => {
	type Created = Omit<Prisma.UnitCreateArgs['data'], 'id'>;
	const data: Created = await event.request.json();

	try {
		const created = await prisma.unit.create({
			data,
			select: entityData.select,
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
