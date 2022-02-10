import prisma from '$lib/config/prisma';
import { formSchema, tenantData } from '$lib/definitions/Tenants';
import { parseParams } from '$lib/utils/table-utils';
import type { Prisma } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit/types/endpoint';

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
		select: tenantData.select,
	});

	// This is a hack to avoid the date to be reformatted during hydration
	// which causes fluttering
	const rows = JSON.parse(JSON.stringify(tenants));
	return {
		body: {
			rows,
		},
	};
};

export const post: RequestHandler = async (event) => {
	const formData = await event.request.formData();
	type NewTenant = Omit<Prisma.TenantCreateArgs['data'], 'id'>;
	const data: NewTenant = Object.fromEntries(formData.entries());

	try {
		formSchema.parse(data);
		if (data.dob) {
			data.dob = new Date(data.dob);
		}
		const tenant = await prisma.tenant.create({
			data,
			select: tenantData.select,
		});
		return {
			status: 200,
			body: tenant,
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
