// /* eslint-disable import/no-extraneous-dependencies */
// // /* eslint-disable */
// import type { Handle, GetSession } from '@sveltejs/kit';
// import { get } from 'svelte/store';
// import { isAuthenticated } from '$lib/stores/auth';
// // import { get } from 'svelte/store';
// // import * as cookie from 'cookie';
// // import { isAuthenticated, user } from '$lib/stores/auth';

// // export const handle: Handle = async ({ request, resolve }) => {
// // 	console.log('request was made');

// //     console.log(request.headers.cookie)
// // 	const cookies = cookie.parse(request.headers.cookie || '');
// // 	const jwt =
// // 		cookies.jwt && Buffer.from(cookies.jwt, 'base64').toString('utf-8');
// // 	console.log('jwt', jwt);
// // 	request.locals.user = jwt ? JSON.parse(jwt) : null;
// // 	const response = resolve(request);
// // 	return {
// // 		...response,
// // 		headers: {
// // 			...response.headers,
// // 			'x-custom-header': 'potato',
// // 		},
// // 	};
// // };
// // export const handle: Handle = async ({ request, resolve }) => {
// // 	console.log('request was made', get(isAuthenticated));

// // 	request.locals.isAuth = get(isAuthenticated);
// // 	const response = await resolve(request);
// // 	return {
// // 		...response,
// // 		headers: {
// // 			...response.headers,
// // 			'x-custom-header': 'svelte-starter-kit',
// // 		},
// // 	};
// // };
// export const handle: Handle = async ({ request, resolve }) => {
// 	const response = await resolve(request);
// 	// Set/Reset authentication cookies for Supabase, when user signs in or signs out
// 	if (request.method === 'POST' && request.path === '/api/auth.json') {
// 		// auth.api.setAuthCookie(request, expressifyResp(response)); // Converts `response` to express compatible format, which Supabase expects for setting headers
// 		// response = deExpressifyResp(response); // Converts response back to its original format
// 	}

// 	return {
// 		...response,
// 		headers: {
// 			...response.headers,
// 			'x-custom-header': 'svelte-starter-kit',
// 		},
// 	};
// };

// // export const getSession: GetSession = async ({ locals }) => {
// // 	console.log('getSession was called');

// // 	return {
// // 		user: locals.user && {
// // 			username: locals.user.username,
// // 			email: locals.user.email,
// // 			image: locals.user.image,
// // 			bio: locals.user.bio,
// // 		},
// // 	};
// // };

// export const getSession: GetSession = async (request) => {
// 	console.log('getSession was called', request.locals);

// 	const { user, isAuth } = request.locals;
// 	// only include the properties that are needed client-side — exclude anything else attached to the user like access tokens etc
// 	// we know that the `user` object won't have anything sensitive so we're making the entire `user` object available
// 	// Note: `getSession` runs only when SvelteKit server-renders a page, not for the API handlers.
// 	return {
// 		user,
// 		isAuth,
// 	};
// };
