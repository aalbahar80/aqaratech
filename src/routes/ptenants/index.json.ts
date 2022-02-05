import type { RequestHandler } from '@sveltejs/kit/types/endpoint';
import prisma from '$lib/config/prisma';

export const get: RequestHandler = async ({ url }) => {
	const pageSize = Number(url.searchParams.get('pageSize')) || 2;
	const pageIndex = Number(url.searchParams.get('page')) || 1;
	const search = url.searchParams.get('search') || '';
	const skip = (Number(pageIndex) - 1) * pageSize;
	const tenants = await prisma.tenant.findMany({
		take: pageSize,
		skip,
		orderBy: { createdAt: 'desc' },
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
		select: {
			id: true,
			firstName: true,
			lastName: true,
			email: true,
			phone: true,
		},
	});
	// TODO optimize this
	const total = await prisma.tenant.count({
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
		select: {
			id: true,
		},
	});
	return {
		body: {
			tenants,
			total: total.id,
		},
	};
};
