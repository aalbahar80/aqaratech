import prismaClient from '$lib/server/prismaClient';
import { inviteUser } from '$lib/services/auth0';
import type { RequestHandler } from './__types/invite';

// TODO protect this route? with _? Call it in postman
export const post: RequestHandler = async ({ params }) => {
	try {
		// get data from db
		const rawClient = await prismaClient.tenant.findUnique({
			where: { id: params.id },
			select: {
				id: true,
				email: true,
				civilid: true,
			},
		});
		const created = await inviteUser(rawClient, 'tenant');
		return created;
	} catch (err) {
		console.error(err);
		return {
			status: 500,
			body: {
				errMsg: 'Failed to create user',
			},
		};
	}
};
