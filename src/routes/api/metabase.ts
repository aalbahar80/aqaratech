import type { RequestHandler } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

export const get: RequestHandler = () => {
	const METABASE_SITE_URL = 'https://metabase.letand.be';
	const METABASE_SECRET_KEY =
		'adfa45b4e0c1dd9fbf284ab761d2c229b87742316c141ea092debd501125fe90';

	const payload = {
		resource: { question: 1 },
		params: {},
		exp: Math.round(Date.now() / 1000) + 10 * 60, // 10 minute expiration
	};
	const token = jwt.sign(payload, METABASE_SECRET_KEY);
	const iframeUrl = `${METABASE_SITE_URL}/embed/question/${token}#bordered=true&titled=true`;
	return {
		status: 200,
		body: { iframeUrl },
	};
};
