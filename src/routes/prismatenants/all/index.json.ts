import type { RequestHandler } from '@sveltejs/kit';
import { prisma } from '$lib/config/prisma';

const _get = () => {
	return prisma.tenants.findMany({
		take: 10,
		select: { id: true, email: true },
	});
};

export const get: RequestHandler = async () => {
	const body = await _get();
	return {
		body,
	};
};

export type Body = Awaited<ReturnType<typeof _get>>;
