import { dev } from '$app/env';

export const protectRoute = (session: App.Session, pathname: string) => {
	const signinUrl = '/login';
	// TODO create nonprotected 404 page
	// TODO make sure idToken is verified at this stage (early in hooks.js)
	return !dev && pathname !== signinUrl && pathname !== '/' && !session.idToken
		? {
				redirect: signinUrl,
				status: 302,
		  }
		: {};
};
