import { environment } from '$environment';
import prismaClient from '$lib/server/prismaClient';
import type { JSONObject } from 'superjson/dist/types';
import { z, ZodError } from 'zod';

interface ToCreate {
	id: string;
	email: string;
	civilid: string;
}

const {
	AUTH0_DEFAULT_DOMAIN,
	AUTH0_CLIENT_ID,
	AUTH0_CLIENT_SECRET,
	AUTH0_ROLE_ID_PROPERTY_OWNER,
} = environment.authConfig;

const UserData = z.object({
	user_id: z.string(),
	email: z.string().email(),
	email_verified: z.boolean(),
	app_metadata: z.object({
		idInternal: z.string().uuid(),
	}),
});

const base = `${AUTH0_DEFAULT_DOMAIN}/api/v2`;

/**
 * Gets Auth0 token for management API. Calls default domain (not custom).
 */
const getAuth0Token = async () => {
	const res = await fetch(`${AUTH0_DEFAULT_DOMAIN}/oauth/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			grant_type: 'client_credentials',
			client_id: AUTH0_CLIENT_ID,
			client_secret: AUTH0_CLIENT_SECRET,
			audience: `${AUTH0_DEFAULT_DOMAIN}/api/v2/`,
		}),
	});
	const Data = z.object({
		access_token: z.string(),
	});
	try {
		const rawData = await res.json();
		console.log({ rawData }, 'auth0.ts ~ 52');
		const data = Data.parse(rawData);
		console.log({ data }, 'auth0.ts ~ 38');
		return data.access_token;
	} catch (e) {
		if (e instanceof ZodError) {
			throw new Error('Failed to get auth0 token', { cause: e });
		} else {
			throw e;
		}
	}
};

/**
 * Fetch wrapper for Auth0.
 */
const auth0Fetch = async ({
	url,
	body,
	method = 'POST',
}: {
	url: string;
	body?: JSONObject;
	method?: string;
}) => {
	const token = await getAuth0Token();
	const res = await fetch(url, {
		method,
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: body ? JSON.stringify(body) : undefined,
	});
	return res;
};

/**
 * Updates our db with the client's auth0 id
 */
export const updateAuthId = async (id: string, auth0Id: string) => {
	try {
		await prismaClient.client.update({
			where: { id },
			data: { auth0Id },
		});
	} catch (e) {
		console.error(e);
		throw e;
	}
};

/**
 * `201`: Created
 *
 * `409`: Conflict (email already exists)
 */
export const createAuth0User = async ({ id, email, civilid }: ToCreate) => {
	// TODO: zod parse ToAuth0
	// TODO: wrap consumer in try/catch
	const res = await auth0Fetch({
		url: `${base}/users`,
		body: {
			connection: 'Username-Password-Authentication',
			email,
			password: civilid,
			verify_email: true,
			app_metadata: {
				idInternal: id,
			},
		},
	});

	const raw = await res.json();
	const { status } = res;
	if (status === 201) {
		// created
		const userData = UserData.parse(raw);
		await updateAuthId(id, userData.user_id);
		console.debug({ raw }, 'invite.ts ~ 23');
		return { success: true as const, userData };
	} else {
		// conflict
		return { success: false as const };
	}
};

export const assignRole = async (sub: string) => {
	const res = await auth0Fetch({
		url: `${base}/users/${sub}/roles`,
		body: {
			// TODO: add tenant roleid
			roles: [AUTH0_ROLE_ID_PROPERTY_OWNER],
		},
	});
	if (res.status === 204) {
		// role assigned
		return true;
	} else {
		throw new Error('Failed to assign role');
	}
};

// /**
//  * `200`: Updated
//  *
//  * `404`: Not found
//  */
// interface ToUpdate {
// 	sub: string;
// 	email: string;
// 	civilid: string;
// }
// const updateAuth0User = async ({ sub, email }: ToUpdate) => {
// 	try {
// 		// TODO: zod parse ToAuth0
// 		const res = await auth0Fetch({
// 			url: `${base}/users/${sub}`,
// 			body: {
// 				connection: 'Username-Password-Authentication',
// 				email,
// 				verify_email: true,
// 				// password: civilid, // can't combine with email, what happens to password here?
// 				// email_verified: false,
// 			},
// 		});
// 		const raw = await res.json();
// 		console.log({ raw }, 'auth0.ts ~ 111'); // del
// 		if (res.status === 200) {
// 			const userData = UserData.parse(raw);
// 			return { status: 200 as const, userData };
// 		} else {
// 			console.log({ raw }, 'auth0.ts ~ 121');
// 			throw new Error('UPDATE_USER_FAILED');
// 		}
// 	} catch (e) {
// 		console.error(e);
// 		throw e;
// 	}
// };

export const usersByEmail = async (email: string) => {
	// TODO: zod parse ToAuth0
	// TODO: wrap consumer in try/catch
	const res = await auth0Fetch({
		url: `${base}/users-by-email?email=${email}`,
		method: 'GET',
	});

	const raw = await res.json();
	if (res.ok) {
		const Auth0Response = z.array(z.object({ email: z.string().email() }));
		const data = Auth0Response.parse(raw);
		return data;
	} else {
		return [];
	}
};
