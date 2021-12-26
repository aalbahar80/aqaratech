/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/prefer-default-export */
import type { RequestHandler } from '@sveltejs/kit';
import type { JSONValue } from '@sveltejs/kit/types/helper';

export const post: RequestHandler<Locals, JSONValue> = async (request) => {
	console.log(request);
	const res = await fetch('http://hasura-xf70.onrender.com/v1/graphql', {
		headers: {
			'x-hasura-admin-secret': 'myadminsecret',
			// 'content-type': 'application/json',
		},
		method: request.method,
		body: request.rawBody,
		// credentials: 'include',

		// rejectUnauthorized: false,

		// ...request
	});

    const data = await res.json();

	console.log('response: ', data);

	return {
        status: res.status,
        body: data
    };
};
