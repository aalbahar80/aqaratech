import prisma from '$lib/config/prisma';
import { formSchema, entityData } from '$lib/definitions/lease';
import { parseParams } from '$lib/utils/table-utils';
import type { Prisma } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit/types/endpoint';

export const get: RequestHandler<{ rows: any[] }> = async ({ url }) => {
	const {
		options: { search, skip, sortDir, sortKey },
	} = parseParams(url);

	const data = await prisma.lease.findMany({
		take: 10,
		skip,
		orderBy: { [sortKey]: sortDir as Prisma.SortOrder },
		select: entityData.select,
	});

	console.log({ data }, 'index.json.ts ~ 19');
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
	type Created = Omit<Prisma.LeaseCreateArgs['data'], 'id'>;
	const data: Created = await event.request.json();

	try {
		formSchema.parse(data);
		const created = await prisma.lease.create({
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
