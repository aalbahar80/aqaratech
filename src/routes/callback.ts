/* eslint-disable import/prefer-default-export */
//  Endpoint for redirection from GitHub after authorization...
import type { RequestHandler } from '@sveltejs/kit';

const tokenURL = 'https://dev-eehvhdp2.eu.auth0.com/oauth/token';
const userURL = 'https://dev-eehvhdp2.eu.auth0.com/userinfo';

const clientId = 'z6oqyOuPLao6XhJeCje9tZ8ZbiJa5zct';
const redirectUri = 'http://localhost:3000/callback';
const secret =
	'uSR4Gjf3XNN-1kfZGuppDqRdbz7XD6A4o2g8yY1GdZgqCXeYhWhdqfPUoIIJLBRf';
export const get: RequestHandler = async (req) => {
	// export async function get(req): RequestHandler {

	//  ...uses that code query parameter from GitHub...
	// const code = req.query.get('code');
	const code = req.url.searchParams.get('code');
	//  ...to get an access_token for the authorized user from GitHub...
	const tokens = await getTokens(code);
	//  ...to get the user information from Github
	const usermaybe = await getUser(tokens.access_token);
	// console.log(usermaybe)

	// this mutates the locals object on the request
	// and will be read by the hooks/handle function
	// after the resolve
	// req.locals.user =  { ...tokens } ;
	// console.log(tokens);
	// req.locals.user = tokens.id_token;
	req.locals.user = usermaybe.sub;

	return {
		status: 302,
		headers: {
			location: '/',
		},
	};
};

async function getTokens(code) {
	const r = await fetch(tokenURL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
		body: JSON.stringify({
			grant_type: 'authorization_code',
			client_id: clientId,
			client_secret: secret,
			code,
			redirect_uri: redirectUri,
		}),
	});
	// console.log(r);
	const r_1 = await r.json();
	// console.log(r_1);
	// console.log('whole reponse:', r_1)
	// console.log('access_token is:', r_1.access_token);
	// console.log('id_token:', r_1.id_token);
	return r_1;
}

async function getUser(accessToken) {
	const r = await fetch(userURL, {
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
	});
	return r.json();
}
