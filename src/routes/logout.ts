//  Logout endpoint

import { BroadcastChannel } from 'broadcast-channel';

export async function get(req) {
	//  Sets the user equal to null...
	req.locals.user = null;
	//  ...and redirect the request back to the home page
	const signedIn = new BroadcastChannel('signed-in');
	await signedIn.postMessage(false);
	return {
		status: 302,
		headers: {
			location: '/landing',
		},
	};
}
