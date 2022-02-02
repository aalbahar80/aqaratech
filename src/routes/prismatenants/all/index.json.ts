import type { RequestHandler } from '@sveltejs/kit';
import { prisma } from '$lib/config/prisma';

const getAT = async () => {
	const body = await prisma.tenants.findMany({
		take: 10,
		select: { id: true, email: true },
	});
	return body;
};

export type GetAT = Awaited<ReturnType<typeof getAT>>;

export const get: RequestHandler<Locals, any, GetAT> = async () => {
	const body = await prisma.tenants.findMany({
		take: 10,
		select: { id: true, email: true },
	});
	return {
		body,
	};
};

const main = async () => {
	const res = await get();
};
