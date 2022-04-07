import * as trpc from '@trpc/server';
// import * as jose from 'jose';
import cookie from 'cookie';

export const createContext = (req: Request) => {
	let user = '';
	// const cookies = req.headers.get('cookie');
	// if (cookies) {
	// 	const authCookie = cookie.parse(cookies)['svelteauthjwt'];
	// 	const decoded = jose.decodeJwt(authCookie);
	// 	console.log({ decoded }, 'router.ts ~ 10');
	// 	user = decoded?.['user']?.['sub'];
	// }
	return { user };
};
export type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => {
	return trpc.router<Context>();
};
