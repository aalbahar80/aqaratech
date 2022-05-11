import { environment } from '$environment';
import { z } from 'zod';

const { AUTH0_DOMAIN } = environment.authConfig;

const UserData = z.object({
	user_id: z.string(),
	email: z.string().email(),
	app_metadata: z.object({
		client_id: z.string().uuid(),
	}),
	email_verified: z.boolean(),
});

// const base = `https://${AUTH0_DOMAIN}/api/v2/users`;
const base = 'https://dev-eehvhdp2.eu.auth0.com/api/v2/users';
const token =
	'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImVvSmoxaGxCdWhZZFh0NmN5bTZtMyJ9.eyJpc3MiOiJodHRwczovL2Rldi1lZWh2aGRwMi5ldS5hdXRoMC5jb20vIiwic3ViIjoibm4weEM2c0t0eFhRWjBRTFBTc0Jqb29aSmZ4OWxWYUtAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LWVlaHZoZHAyLmV1LmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNjUyMjUxNDM3LCJleHAiOjE2NTIzMzc4MzcsImF6cCI6Im5uMHhDNnNLdHhYUVowUUxQU3NCam9vWkpmeDlsVmFLIiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSByZWFkOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl9jdXN0b21fYmxvY2tzIGRlbGV0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfdGlja2V0cyByZWFkOmNsaWVudHMgdXBkYXRlOmNsaWVudHMgZGVsZXRlOmNsaWVudHMgY3JlYXRlOmNsaWVudHMgcmVhZDpjbGllbnRfa2V5cyB1cGRhdGU6Y2xpZW50X2tleXMgZGVsZXRlOmNsaWVudF9rZXlzIGNyZWF0ZTpjbGllbnRfa2V5cyByZWFkOmNvbm5lY3Rpb25zIHVwZGF0ZTpjb25uZWN0aW9ucyBkZWxldGU6Y29ubmVjdGlvbnMgY3JlYXRlOmNvbm5lY3Rpb25zIHJlYWQ6cmVzb3VyY2Vfc2VydmVycyB1cGRhdGU6cmVzb3VyY2Vfc2VydmVycyBkZWxldGU6cmVzb3VyY2Vfc2VydmVycyBjcmVhdGU6cmVzb3VyY2Vfc2VydmVycyByZWFkOmRldmljZV9jcmVkZW50aWFscyB1cGRhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpkZXZpY2VfY3JlZGVudGlhbHMgY3JlYXRlOmRldmljZV9jcmVkZW50aWFscyByZWFkOnJ1bGVzIHVwZGF0ZTpydWxlcyBkZWxldGU6cnVsZXMgY3JlYXRlOnJ1bGVzIHJlYWQ6cnVsZXNfY29uZmlncyB1cGRhdGU6cnVsZXNfY29uZmlncyBkZWxldGU6cnVsZXNfY29uZmlncyByZWFkOmhvb2tzIHVwZGF0ZTpob29rcyBkZWxldGU6aG9va3MgY3JlYXRlOmhvb2tzIHJlYWQ6YWN0aW9ucyB1cGRhdGU6YWN0aW9ucyBkZWxldGU6YWN0aW9ucyBjcmVhdGU6YWN0aW9ucyByZWFkOmVtYWlsX3Byb3ZpZGVyIHVwZGF0ZTplbWFpbF9wcm92aWRlciBkZWxldGU6ZW1haWxfcHJvdmlkZXIgY3JlYXRlOmVtYWlsX3Byb3ZpZGVyIGJsYWNrbGlzdDp0b2tlbnMgcmVhZDpzdGF0cyByZWFkOmluc2lnaHRzIHJlYWQ6dGVuYW50X3NldHRpbmdzIHVwZGF0ZTp0ZW5hbnRfc2V0dGluZ3MgcmVhZDpsb2dzIHJlYWQ6bG9nc191c2VycyByZWFkOnNoaWVsZHMgY3JlYXRlOnNoaWVsZHMgdXBkYXRlOnNoaWVsZHMgZGVsZXRlOnNoaWVsZHMgcmVhZDphbm9tYWx5X2Jsb2NrcyBkZWxldGU6YW5vbWFseV9ibG9ja3MgdXBkYXRlOnRyaWdnZXJzIHJlYWQ6dHJpZ2dlcnMgcmVhZDpncmFudHMgZGVsZXRlOmdyYW50cyByZWFkOmd1YXJkaWFuX2ZhY3RvcnMgdXBkYXRlOmd1YXJkaWFuX2ZhY3RvcnMgcmVhZDpndWFyZGlhbl9lbnJvbGxtZW50cyBkZWxldGU6Z3VhcmRpYW5fZW5yb2xsbWVudHMgY3JlYXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRfdGlja2V0cyByZWFkOnVzZXJfaWRwX3Rva2VucyBjcmVhdGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiBkZWxldGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiByZWFkOmN1c3RvbV9kb21haW5zIGRlbGV0ZTpjdXN0b21fZG9tYWlucyBjcmVhdGU6Y3VzdG9tX2RvbWFpbnMgdXBkYXRlOmN1c3RvbV9kb21haW5zIHJlYWQ6ZW1haWxfdGVtcGxhdGVzIGNyZWF0ZTplbWFpbF90ZW1wbGF0ZXMgdXBkYXRlOmVtYWlsX3RlbXBsYXRlcyByZWFkOm1mYV9wb2xpY2llcyB1cGRhdGU6bWZhX3BvbGljaWVzIHJlYWQ6cm9sZXMgY3JlYXRlOnJvbGVzIGRlbGV0ZTpyb2xlcyB1cGRhdGU6cm9sZXMgcmVhZDpwcm9tcHRzIHVwZGF0ZTpwcm9tcHRzIHJlYWQ6YnJhbmRpbmcgdXBkYXRlOmJyYW5kaW5nIGRlbGV0ZTpicmFuZGluZyByZWFkOmxvZ19zdHJlYW1zIGNyZWF0ZTpsb2dfc3RyZWFtcyBkZWxldGU6bG9nX3N0cmVhbXMgdXBkYXRlOmxvZ19zdHJlYW1zIGNyZWF0ZTpzaWduaW5nX2tleXMgcmVhZDpzaWduaW5nX2tleXMgdXBkYXRlOnNpZ25pbmdfa2V5cyByZWFkOmxpbWl0cyB1cGRhdGU6bGltaXRzIGNyZWF0ZTpyb2xlX21lbWJlcnMgcmVhZDpyb2xlX21lbWJlcnMgZGVsZXRlOnJvbGVfbWVtYmVycyByZWFkOmVudGl0bGVtZW50cyByZWFkOmF0dGFja19wcm90ZWN0aW9uIHVwZGF0ZTphdHRhY2tfcHJvdGVjdGlvbiByZWFkOm9yZ2FuaXphdGlvbnNfc3VtbWFyeSByZWFkOm9yZ2FuaXphdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGNyZWF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgcmVhZDpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBjcmVhdGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.cKfwdtQxEdIe91llhW45koKYwdW7QHw4XrBWzbtZjILw1JMunf8bDWrGRTLoZhfFTDaLe5D35U1u37ly_jjtRzbSfhrXoqhEKHSubcNImWRYKsP7-xNvUq65X1roRZjFSquUvkeh-8Y2VU7GjvpcCkHliRZAuwlmnMx23lFxpN1efHbp1uzaqYmHsFina9RfG9my856YawaWAbDgp1K-RIxR15LquNa1V6rX-I-INnbyZdImBs2L3xruDvg9OAxnWY1Pw6xksAvx1om3ZiBAnSxPzuhVgt-jy0dSsr_lf0QynL-4t_pS5xz2McW73kbMesvdevf_uWMIaSGKkDizyg';

const auth0Fetch = async (url: string, options: RequestInit) => {
	const res = await fetch(url, options);
	const raw = await res.json();
	return raw;
};

interface ToCreate {
	id: string;
	email: string;
	civilid: string;
}
interface ToUpdate {
	sub: string;
	email: string;
	civilid: string;
}

/**
 * `201`: Created
 *
 * `409`: Conflict (email already exists)
 */
export const createAuth0User = async ({ id, email, civilid }: ToCreate) => {
	try {
		// TODO: zod parse ToAuth0
		const res = await fetch(base, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				connection: 'Username-Password-Authentication',
				email,
				password: civilid,
				verify_email: true,
				app_metadata: { idInternal: id },
				user_metadata: { idInternal: id }, // TODO: delete me
			}),
		});
		const raw = await res.json();
		const { status } = res;
		console.debug({ raw }, 'invite.ts ~ 23');
		if (status === 201) {
			// created
			const userData = UserData.parse(raw);
			await updateAuthId(id, userData.user_id);
			return { status: 201 as const, userData };
		} else if (status === 409) {
			return { status: 409 as const, userData };
		} else {
			console.debug({ raw }, 'auth0.ts ~ 121');
			throw new Error('CREATE_USER_FAILED');
		}
	} catch (e) {
		console.error(e);
		throw e;
	}
};

export const assignRole = async (sub: string) => {
	try {
		const res = await fetch(`${base}/${sub}/roles`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				roles: ['rol_n6YdReDFqv4IG60y'], // TODO: replace with .env
			}),
		});
		const data = await res.json();
		console.log({ data }, 'auth0.ts ~ 93');

		if (res.status === 201) {
			// role assigned
			return true;
		} else {
			return false;
		}
	} catch (e) {
		console.error(e);
		return false;
	}
};

/**
 * `200`: Updated
 *
 * `404`: Not found
 */
export const updateAuth0User = async ({ sub, email }: ToUpdate) => {
	try {
		// TODO: zod parse ToAuth0
		const res = await fetch(`${base}/${sub}`, {
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				connection: 'Username-Password-Authentication',
				email,
				verify_email: true,
				// password: civilid, // can't combine with email, what happens to password here?
				// email_verified: false,
			}),
		});
		const raw = await res.json();
		console.log({ raw }, 'auth0.ts ~ 111'); // del
		if (res.status === 200) {
			const userData = UserData.parse(raw);
			return { status: 200 as const, userData };
		} else {
			console.log({ raw }, 'auth0.ts ~ 121');
			throw new Error('UPDATE_USER_FAILED');
		}
	} catch (e) {
		console.error(e);
		throw e;
	}
};

export const updateAuthId = async (id: string, userId: string) => {
	try {
		await prismaClient.client.update({
			where: { id },
			data: { auth0Id: userId },
		});
	} catch (e) {
		console.error(e);
		throw e;
	}
};
