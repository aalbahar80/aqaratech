import { environment } from '$environment';
import type { RequestHandler } from '@sveltejs/kit';

//@ts-ignore
export const GET: RequestHandler = async () => {
	// TODO rm prod
	if (environment.envName === 'prod') {
		return { status: 403 };
	}

	return {
		status: 200,
		body: {
			environment,
			processEnv: process.env,
		},
	};
};
