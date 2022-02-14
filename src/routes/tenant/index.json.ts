import { logger } from '$lib/config/logger';
import prisma from '$lib/config/prisma';
import { tenantData } from '$lib/definitions/select';
import { formSchema } from '$lib/definitions/tenant';
import { parseParams } from '$lib/utils/table-utils';
import type { Prisma } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit/types/endpoint';

export const get: RequestHandler<{ rows: any[] }> = async ({ url }) => {
	const {
		options: { search, skip, sortDir, sortKey },
	} = parseParams(url);

	logger.debug('starthere', 'index.json.ts ~ 14');
	const totalQuery = prisma.tenant.count();
	const dataQuery = prisma.tenant.findMany({
		take: 10,
		skip,
		orderBy: { [sortKey]: sortDir as Prisma.SortOrder },
		where: {
			OR: [
				{ firstName: { contains: search } },
				{ secondName: { contains: search } },
				{ thirdName: { contains: search } },
				{ lastName: { contains: search } },
				{ email: { contains: search } },
				{ phone: { contains: search } },
				{ civilid: { contains: search } },
			],
		},
		select: tenantData.select,
	});
	const [data, total] = await prisma.$transaction([dataQuery, totalQuery]);

	logger.debug({ data }, 'index.json.ts ~ 31');
	logger.debug({ total }, 'index.json.ts ~ 33');
	return {
		body: {
			rows: data,
			total,
		},
	};
};

export const post: RequestHandler = async (event) => {
	const data = await event.request.json();

	try {
		formSchema.parse(data);
		const created = await prisma.tenant.create({
			data,
			select: tenantData.select,
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
