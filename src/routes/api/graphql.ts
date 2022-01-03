/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/prefer-default-export */
import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async (request) => {
	
	console.log("🚀 ~ file: graphql.ts ~ line 11 ~ constpost:RequestHandler= ~ request.locals.hasura", request.locals.hasura)
	const res = await fetch('https://hasura-xf70.onrender.com/v1/graphql', {
		headers: {
			// 'x-hasura-admin-secret': 'myadminsecret',
			Authorization: `Bearer ${request.locals.hasura}`,
		},
		method: request.method,
		body: request.rawBody,
	});

    const data = await res.json();
	return {
        status: res.status,
        body: data
    };
};
