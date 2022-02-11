import prisma from '$lib/config/prisma';
import { formSchema } from '$lib/definitions/property';
import { propertyData } from '$lib/definitions/select';
import { parseParams } from '$lib/utils/table-utils';
import type { Prisma } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit/types/endpoint';

export const get: RequestHandler<{ rows: any[] }> = async ({ url }) => {
	const {
		options: { search, skip, sortDir, sortKey },
	} = parseParams(url);

	const data = await prisma.property.findMany({
		take: 10,
		skip,
		orderBy: { [sortKey]: sortDir as Prisma.SortOrder },
		where: {
			OR: [
				{ area: { contains: search } },
				{ block: { contains: search } },
				{ street: { contains: search } },
				{ number: { contains: search } },
			],
		},
		select: propertyData.select,
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
	type Created = Omit<Prisma.PropertyCreateArgs['data'], 'id'>;
	const data: Created = await event.request.json();

	try {
		formSchema.parse(data);
		const created = await prisma.property.create({
			data,
			select: propertyData.select,
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
