import prismaClient from '$lib/server/prismaClient';
import { assignRole, createAuth0User } from '$lib/services/auth0';
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
				auth0Id: true,
				email: true,
				civilid: true,
			},
		});
		if (!rawClient) {
			return {
				status: 404,
				body: {
					code: 'NOT_FOUND',
					message: 'Client not found',
				},
			};
		}
		if (rawClient.auth0Id) {
			return {
				status: 409,
				body: {
					code: 'ALREADY_EXISTS',
					message: 'Client has an existing account', // add info about steps to resolve
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
					code: 'INVALID_DATA',
					message: 'email and civilid are required to create a user account',
				},
			};
		}
		const { id, email, civilid } = client.data;

		// create auth0 user
		const created = await createAuth0User({ id, email, civilid });
		if (created.status === 409) {
			return {
				status: 409,
				body: {
					code: 'ALREADY_EXISTS',
					message: 'Client has an existing account', // add info about steps to resolve
				},
			};
		} else if (created.status === 201) {
			// assign correct role
			const userId = z.string().parse(created.userData.user_id);
			const roleAssigned = await assignRole(userId);
			if (roleAssigned) {
				return {
					status: 201,
					body: {
						code: 'SUCCESS',
						message: `Account created. An email with a link to activate it has been sent to the client: ${email}`,
					},
				};
			} else {
				return {
					status: 500,
					body: {
						code: 'ROLE_ASSIGNMENT_FAILED',
						message:
							'A user account account has been created but the role assignment failed. Log in to Auth0 and assign the correct role to the user',
					},
				};
			}
		} else {
			return {
				status: 404,
				body: {
					success: false,
					code: 'ACCOUNT_CREATION_FAILED',
					message: 'Failed to create user account in Auth0',
				},
			};
		}
	} catch (err) {
		console.error(err);
		return {
			status: 500,
			body: {
				success: false,
				code: 'UNKNOWN_ERROR',
				message: 'Log into Auth0 to manage user',
			},
		};
	}
};
