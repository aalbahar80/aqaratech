// import { environment } from '$environment';
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
			// const abc = await prismaClient.client.findUnique({
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

		// create auth0 user
		const created = await createAuth0User({ id, email, civilId });
		if (created.status === 201) {
			const roleAssigned = await assignRole(created.userData?.user_id);
			if (roleAssigned) {
				return { status: 201, body: { userData: created.userData } };
			}
		} else if (created.status === 409) {
			const updated = await updateAuth0User({ sub: id, email, civilId });
			if (updated.status === 200) {
				const roleAssigned = await assignRole(updated.userData?.user_id);
				if (roleAssigned) {
					return { status: 201, body: { userData: created.userData } };
				}
			}
		} else {
			return { status: 500, body: { userData: null } };
		}
	} catch (err) {
		console.error(err);
		throw err;
	}
};
