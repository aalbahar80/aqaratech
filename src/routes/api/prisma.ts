import { prisma } from '$lib/config/prisma';
import type { RequestHandler } from '@sveltejs/kit';
import { Prisma } from '@prisma/client';

// export const getAllTenants = async () => {
// 	const allTenants = await prisma.tenants.findMany({
// 		take: 2,
// 		select: {
// 			id: true,
// 			first_name: true,
// 			civilid: true,
// 		},
// 	});
// 	return allTenants;
// };

// export const get: RequestHandler<Locals> = async (event) => {
// 	const someTenants = await prisma.tenants.findMany({
// 		take: 4,
// 		select: {
// 			id: true,
// 			first_name: true,
// 			phone: true,
// 		},
// 	});
// 	if (someTenants) {
// 		console.log(someTenants);
// 		return {
// 			status: 200,
// 			body: someTenants,
// 		};
// 	}
// 	return {
// 		status: 404,
// 	};
// };

/*
	This module is used by the /todos.json and /todos/[uid].json
	endpoints to make calls to api.svelte.dev, which stores todos
	for each user. The leading underscore indicates that this is
	a private module, _not_ an endpoint — visiting /todos/_api
	will net you a 404 response.

	(The data on the todo app will expire periodically; no
	guarantees are made. Don't use it to organise your life.)
*/
export async function api(request, resource: string, data?) {
	let body = {};
	let status = 500;
	switch (request.method.toUpperCase()) {
		case 'DELETE':
			await prisma.tenants.delete({
				where: {
					id: resource.split('/').pop(),
				},
			});
			status = 200;
			break;
		case 'GET':
			body = await prisma.tenants.findMany();
			status = 200;
			break;
		case 'PATCH':
			body = await prisma.tenants.update({
				data: {
					first_name: data?.first_name,
					phone: data?.phone,
				},
				where: {
					id: resource.split('/').pop(),
				},
			});
			status = 200;
			break;
		case 'POST':
			body = await prisma.tenants.create({
				data: {
					email: data?.email,
					last_name: data?.last_name,
				},
			});
			status = 201;
			break;
	}

	// if the request came from a <form> submission, the browser's default
	// behaviour is to show the URL corresponding to the form's "action"
	// attribute. in those cases, we want to redirect them back to the
	// /todos page, rather than showing the response
	// if (
	// 	request.method !== 'GET' &&
	// 	request.headers.accept !== 'application/json'
	// ) {
	// 	return {
	// 		status: 303,
	// 		headers: {
	// 			location: '/todos',
	// 		},
	// 	};
	// }

	return {
		status,
		body,
	};
}
