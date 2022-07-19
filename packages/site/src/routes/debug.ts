import { environment } from '$environment';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
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
