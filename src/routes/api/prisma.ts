import prisma from '$lib/config/prisma';
import type { Prisma } from '@prisma/client';
import type { RequestEvent } from '@sveltejs/kit';
/*
	This module is used by the /todos.json and /todos/[uid].json
	endpoints to make calls to api.svelte.dev, which stores todos
	for each user. The leading underscore indicates that this is
	a private module, _not_ an endpoint — visiting /todos/_api
	will net you a 404 response.

	(The data on the todo app will expire periodically; no
	guarantees are made. Don't use it to organise your life.)
*/

export async function api(
	event: RequestEvent,
	// resource: string,
	data?: Prisma.tenantsCreateInput,
) {
	console.log(data);
	const { request, params } = event;
	let body = {};
	let status = 500;
	// eslint-disable-next-line default-case
	switch (request.method.toUpperCase()) {
		case 'DELETE':
			await prisma.tenants.delete({
				where: {
					// id: resource.split('/').pop(),
					id: params.id,
				},
			});
			status = 200;
			break;
		case 'GET':
			body = await prisma.tenants.findMany({
				take: 10,
				orderBy: { created_at: 'desc' },
				select: {
					id: true,
					first_name: true,
					dob: true,
				},
			});
			status = 200;
			break;
		case 'PATCH':
			body = await prisma.tenants.update({
				data: {
					first_name: data?.first_name,
					is_ok: data?.is_ok,
					phone: data?.phone,
				},
				where: {
					// id: resource.split('/').pop(),
					id: params.id,
				},
			});
			status = 200;
			break;
		case 'POST':
			body = await prisma.tenants.create({
				data: {
					first_name: data?.first_name,
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
	if (
		request.method !== 'GET' &&
		request.headers.get('accept') !== 'application/json'
	) {
		return {
			status: 303,
			headers: {
				location: '/prismatenants',
			},
		};
	}

	return {
		status,
		body,
	};
}
