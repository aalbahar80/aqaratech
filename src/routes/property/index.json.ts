import prisma from '$lib/server/prismaClient';
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
