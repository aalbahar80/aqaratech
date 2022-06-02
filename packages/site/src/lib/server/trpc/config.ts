import type { createTRPCHandle } from '$lib/server/trpc';
import { getAuthz } from '$lib/server/utils';
import type { RequestEvent } from '@sveltejs/kit';
import type { inferAsyncReturnType } from '@trpc/server';

type TRPCHandler = Parameters<typeof createTRPCHandle>;
type ResponseMetaFn = NonNullable<TRPCHandler[0]['responseMeta']>;

export const createContext = async (event: RequestEvent) => {
	const token = event.locals.accessToken;
	const authz = await getAuthz(token);
	return {
		authz,
	};
};

export type Context = inferAsyncReturnType<typeof createContext>;

export const responseMeta: ResponseMetaFn = ({ type, errors, paths }) => {
	if (type === 'query' && errors.length === 0) {
		if (paths?.includes('public:expenses:meta')) {
			// const duration = 60 * 60 * 24 * 7;
			return {
				headers: {
					// 'cache-control': `max-age=59, stale-while-revalidate=${duration}`,
				},
			};
		} else {
			return {};
		}
	} else {
		return {};
	}
};
