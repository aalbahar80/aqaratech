import prismaClient from '$lib/server/prismaClient';
import {
	assignRole,
	createAuth0User,
	updateAuth0User,
} from '$lib/services/auth0';
import { z } from 'zod';
import type { RequestHandler } from './invite.d';

// TODO protect this route? with _? Call it in postman
export const post: RequestHandler = async ({ params }) => {
	try {
		// get data from db
		const rawClient = await prismaClient.client.findUnique({
			where: { id: params.id },
			select: {
				id: true,
				email: true,
				civilid: true,
			},
		});
		const Client = z.object({
			id: z.string(),
			email: z.string().email(),
			civilId: z.string(),
		});
		const { id, email, civilId } = Client.parse(rawClient);

		let rawUserId: string | undefined;
		// create auth0 user
		const created = await createAuth0User({ id, email, civilId });
		if (created.status === 201) {
			rawUserId = created.userData.user_id;
		} else if (created.status === 409) {
			// update existing auth0 user
			const updated = await updateAuth0User({ sub: id, email, civilId });
			rawUserId = updated.userData.user_id;
		} else {
			// Case won't be reached in current implementation
			return {
				status: 404,
				body: {
					success: false,
					message: 'Failed to create or update user in Auth0',
				},
			};
		}
		const userId = z.string().parse(rawUserId);

		// check/assign correct role
		const roleAssigned = await assignRole(userId);
		if (roleAssigned) {
			return { status: 200, body: { success: true, email } };
		} else {
			return {
				status: 500,
				body: { success: false, message: 'Failed to assign role in Auth0' },
			};
		}
	} catch (err) {
		console.error(err);
		return {
			status: 500,
			body: { success: false, message: 'Faled to send invitation email' },
		};
	}
};
