/* eslint-disable import/prefer-default-export */
//  Login endpoint

const ghAuthURL = 'https://dev-eehvhdp2.eu.auth0.com/authorize';
const clientId = 'z6oqyOuPLao6XhJeCje9tZ8ZbiJa5zct';
const scope = 'openid name picture profile email https://hasura.io/jwt/claims'
const redirectUri = 'http://localhost:3000/callback'

// import auth from '$lib/services/auth';

export async function get(req) {
	const sessionId = '1234';
	//  Redirect request to GitHub authentication endpoint with CLIENT_ID
	return {
		status: 302,
		headers: {
			// location: `${ghAuthURL}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${sessionId}`,
			location: `${ghAuthURL}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`,
		},
	};
}