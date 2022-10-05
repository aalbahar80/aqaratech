// import { AUTH_CALLBACK, LOGIN, LOGOUT } from '$lib/constants/routes';

// const AUTH_ROUTES = [LOGIN, LOGOUT, AUTH_CALLBACK];

// const isAuthRoute = (path: string) => AUTH_ROUTES.includes(path);

const PUBLIC_ROUTES = ['/'];

export const isPublicRoute = (pathname: string) =>
	PUBLIC_ROUTES.includes(pathname);
