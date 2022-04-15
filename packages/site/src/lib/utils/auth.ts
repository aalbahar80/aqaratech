import { dev } from '$app/env';

export const protectRoute = (session: App.Session, pathname: string) => {
	const signinUrl = '/login';
	// TODO create nonprotected 404 page
	return !dev && pathname !== signinUrl && pathname !== '/' && !session.user
		? {
				redirect: signinUrl,
				status: 302,
		  }
		: {};
};
