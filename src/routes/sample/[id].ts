import { logger } from '$lib/config/logger';

export const get: RequestHandler = ({ params }) => {
	// `params.id` comes from [id].js
	console.log('endpoint running');
	const myId = params.id;
	logger.debug({ myId }, '[id].ts ~ 5');
	// const item = await db.get(params.id);

	return {
		body: { myId },
	};
};
