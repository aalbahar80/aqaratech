import * as trpc from '@trpc/server';

export const createContext = (req: Request) => {
	console.log(req);
	const user = 'this is user';
	return { user };
};
export type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => {
	return trpc.router<Context>();
};
