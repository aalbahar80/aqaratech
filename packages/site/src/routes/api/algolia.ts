export {};
// import algoliasearch from 'algoliasearch/lite';
// import prismaClient from '$lib/server/prismaClient';
// import type { RequestHandler } from '@sveltejs/kit';

// export const get: RequestHandler = async () => {
// 	const client = algoliasearch(
// 		'IGY4NBXHYT',
// 		'c16ede0b389899e7cbcd681e5de13dbf',
// 	);
// 	const index = client.initIndex('clientIndex');
// 	const clients = await prismaClient.client.findMany({
// 		select: {
// 			id: true,
// 			firstName: true,
// 			lastName: true,
// 			secondName: true,
// 			thirdName: true,
// 			civilid: true,
// 			phone: true,
// 			email: true,
// 			isActive: true,
// 			updatedAt: true,
// 			createdAt: true,
// 		},
// 	});
// 	console.log(`Fetched ${clients.length} clients from the DB`);

// 	clients.forEach((product) => {
// 		index.saveObject({
// 			...product,
// 			objectID: product.id,
// 		});
// 	});
// 	return {
// 		status: 200,
// 	};
// };
