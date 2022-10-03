import type { ValidatedUserDto } from '$api/openapi';
import { env } from '$env/dynamic/public';

// TODO: rename to getUser
export const getUserByEmail = async (accessToken: string) => {
	// construct url
	const url = new URL(`${env.PUBLIC_API_URL_LOCAL}/users/me`);

	// fetch user
	const res = await fetch(url.toString(), {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
	});

	const data = (await res.json()) as ValidatedUserDto;

	return data;
};
