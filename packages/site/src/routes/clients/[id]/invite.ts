import prismaClient from '$lib/server/prismaClient';
import { assignRole, createAuth0User, usersByEmail } from '$lib/services/auth0';
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

		if (!rawClient) {
			return {
				status: 404,
				body: {
					errorMsg: 'Client not found',
				},
			};
		}

		const Client = z.object({
			id: z.string(),
			email: z.string().email(),
			civilid: z.string(),
		});

		const client = Client.safeParse(rawClient);
		if (!client.success) {
			return {
				status: 400,
				body: {
					errorMsg: 'Email and civilid are required to create a user account',
				},
			};
		}
		const { id, email, civilid } = client.data;

		// check if user exists
		const existingUsers = await usersByEmail(email);
		console.log({ existingUsers }, 'invite.ts ~ 47');
		const userExists = existingUsers.some((u) => u.email === email);
		console.log({ userExists }, 'invite.ts ~ 49');
		if (userExists) {
			return {
				status: 409,
				body: {
					errorMsg: 'A user with this email already exists',
				},
			};
		}

		// create auth0 user
		const created = await createAuth0User({ id, email, civilid });
		if (created.success) {
			// assign correct role
			const userId = z.string().parse(created.userData.user_id);
			const roleAssigned = await assignRole(userId, 'propertyOwner');
			if (roleAssigned) {
				return {
					status: 201,
					body: {
						email: created.userData.email,
					},
				};
			}
		}

		throw new Error('Failed to create user');
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
