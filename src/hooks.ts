// /* eslint-disable import/prefer-default-export */
// import type { Handle } from '@sveltejs/kit';

// export const handle: Handle = async ({ request, resolve }) => {
// 	request.headers = {
// 		...request.headers,
// 		'x-hasura-admin-secret':
// 			'myadminsecret',
// 	};
// 	console.log(request.headers);
//     console.log(request)
// 	const response = await resolve(request);
// 	console.log(response.headers);

// 	return {
// 		...response,
// 		headers: {
// 			...response.headers,
// 			'x-custom-header': 'potato',
// 			'x-hasura-admin-secret':
// 				'myadminsecret',
// 		},
// 	};
// };
