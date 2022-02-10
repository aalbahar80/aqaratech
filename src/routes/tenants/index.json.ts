import prisma from '$lib/config/prisma';
import { select, validation } from '$lib/definitions/Tenants';
import { parseParams } from '$lib/utils/table-utils';
import { Prisma } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit/types/endpoint';
import { z } from 'zod';

export const get: RequestHandler<{ rows: any[] }> = async ({ url }) => {
	const {
		options: { search, skip, sortDir, sortKey },
	} = parseParams(url);

	const tenants = await prisma.tenant.findMany({
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
		select,
	});

	// This is a hack to avoid the date to be reformatted during hydration
	// which causes fluttering
	const rows = JSON.parse(JSON.stringify(tenants));
	return {
		// headers: {
		// 	'cache-control': 's-maxage=3, stale-while-revalidate=59',
		// },
		body: {
			rows,
		},
	};
};

export const post: RequestHandler = async (event) => {
	const formData = await event.request.formData();
	const data = Object.fromEntries(formData.entries());

	// const createTenant = (firstName: string, lastName?: string) => {
	// 	return Prisma.validator<Prisma.TenantCreateInput>()({
	// 		firstName,
	// 		lastName,
	// 	});
	// };
	// type TenantCreation = Omit<Prisma.TenantCreateArgs['data'], 'id'>;

	// assert data is valid against zod schema
	const validationResult = validation.safeParse(data);
	console.log({ validationResult }, 'index.json.ts ~ 60');

	try {
		// validation.parse(data);
		validation.safeParse(data);
		if (data.dob) {
			data.dob = new Date(data.dob);
		}
		const tenant = await prisma.tenant.create({
			data,
		});
		return {
			status: 200,
			body: tenant,
		};
	} catch (error) {
		console.error(error);
		return {
			status: 400,
			body: {
				error: error.message,
			},
		};
	}
	// const response = await prisma.tenant.create({
	// 	data: {
	// 		firstName: data.get('firstName')?.toString() || null,
	// 		lastName: data.get('lastName')?.toString() || null,
	// 		email: data.get('email')?.toString() || null,
	// 		phone: data.get('phone')?.toString() || null,
	// 		civilid: data.get('civilid')?.toString() || null,
	// 	},
	// 	select,
	// });
};
