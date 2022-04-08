import type { createTRPCHandle } from '$lib/server/trpc';
import type { RequestEvent } from '@sveltejs/kit/types/private';
import { router as trpcRouter, type inferAsyncReturnType } from '@trpc/server';

type TRPCHandler = Parameters<typeof createTRPCHandle>;
type ResponseMetaFn = NonNullable<TRPCHandler[0]['responseMeta']>;

export const createContext = async (event: RequestEvent) => {
	return {
		user: event.locals.user,
		accessToken: event.locals.accessToken,
	};
};

export type Context = inferAsyncReturnType<typeof createContext>;
export const createRouter = () => {
	return trpcRouter<Context>();
};

export const responseMeta: ResponseMetaFn = ({ type, errors, paths }) => {
	const charts = paths?.every((path) => path.startsWith('charts'));
	if (type === 'query' && errors.length === 0 && charts) {
		// TODO review caching, charts and others
		const duration = 60 * 10;
		return {
			headers: {
				'cache-control': `max-age=10, stale-while-revalidate=${duration}, private`,
			},
		};
	} else {
		return {};
	}
};
