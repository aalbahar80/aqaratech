import type {
	RequestHandler,
	ShadowRequestHandler,
} from '@sveltejs/kit/types/endpoint';
import prisma from '$lib/config/prisma';
import { logger } from '$lib/config/logger';

export const get: RequestHandler = async ({ params }) => {
	const { pageIndex } = params;
	logger.warn({ pageIndex }, '[pageIndex].ts ~ 25');
	const pageSize = 1;
	const skip = (Number(pageIndex) - 1) * pageSize;
	const tenants = await prisma.tenant.findMany({
		take: pageSize,
		skip,
		orderBy: { createdAt: 'desc' },
	});
	console.log(tenants);
	return {
		body: {
			tenants,
		},
	};
};
