import { HOME_ROUTES } from './is-home-route';

// TODO: Remove '/' since lang parameter is required?
const PUBLIC_ROUTES = ['/', ...HOME_ROUTES];

export const isPublicRoute = (pathname: string) =>
	PUBLIC_ROUTES.includes(pathname);
