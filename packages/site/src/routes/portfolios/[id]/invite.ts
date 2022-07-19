import prismaClient from '$lib/server/prismaClient';
import { inviteUser } from '$lib/services/auth0';
import type { RequestHandler } from './__types/invite';

// TODO protect this route? with _? Call it in postman
export const POST: RequestHandler = async ({ params }) => {
	try {
		// get data from db
		const rawPortfolio = await prismaClient.portfolio.findUnique({
			where: { id: params.id },
			select: {
				id: true,
				email: true,
				civilid: true,
			},
		});
		const created = await inviteUser(rawPortfolio, 'propertyOwner');
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
