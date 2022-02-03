import type { RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/config/prisma';
import { logger } from '$lib/config/logger';

const _get = () => {
	return prisma.tenant.findMany({
		take: 10,
		select: { id: true, email: true },
	});
};

export const get: RequestHandler = async () => {
	const body = await _get();
	logger.warn({ body }, 'prismatenants/all.json.ts ~ 13');
	return {
		body,
	};
};

export type Body = Awaited<ReturnType<typeof _get>>;
