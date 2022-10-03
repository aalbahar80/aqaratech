import type { ValidatedUserDto } from '$api/openapi';
import { env as privateEnv } from '$env/dynamic/private';
import { env } from '$env/dynamic/public';

export const getUserByEmail = async (email: string) => {
	// construct url
	const url = new URL(`${env.API_URL}/users/by-email`);
	url.searchParams.set('email', email);

	// fetch user
	const res = await fetch(url.toString(), {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			// TODO: add m2m auth header to .env
			Authorization: `Bearer ${privateEnv.M2M_TOKEN}`,
		},
	});

	const data = (await res.json()) as ValidatedUserDto;

	return data;
};
