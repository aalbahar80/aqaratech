import type { createTRPCHandle } from '$lib/server/trpc';
import type { RequestEvent } from '@sveltejs/kit/types/private';
import * as jose from 'jose';
import {
	router as trpcRouter,
	TRPCError,
	type inferAsyncReturnType,
} from '@trpc/server';

type TRPCHandler = Parameters<typeof createTRPCHandle>;
type ResponseMetaFn = NonNullable<TRPCHandler[0]['responseMeta']>;

interface Auth0UserMeta {
	userMetadata: {
		idInternal?: string;
	};
}

export const createContext = async (event: RequestEvent) => {
	return {
		user: event.locals.user,
		rawAccessToken: event.locals.accessToken,
	};
};

export type Context = inferAsyncReturnType<typeof createContext>;

export const createRouter = () => {
	return trpcRouter<Context>().middleware(async ({ ctx, next }) => {
		try {
			if (!ctx.rawAccessToken) {
				throw new TRPCError({ code: 'UNAUTHORIZED' });
			}
			// TODO use .env
			const JWKS = jose.createRemoteJWKSet(
				new URL('https://dev-eehvhdp2.eu.auth0.com/.well-known/jwks.json'),
			);
			const start = Date.now();
			const { payload } = await jose.jwtVerify(ctx.rawAccessToken, JWKS, {
				audience: 'letand.be/api',
				issuer: 'https://dev-eehvhdp2.eu.auth0.com/',
				algorithms: ['RS256'],
			});
			if (!payload.sub) {
				throw new TRPCError({ code: 'UNAUTHORIZED' });
			}
			const accessToken = {
				...payload,
				roles: payload['https://letand.be/roles'] as string[],
				userMetadata: payload[
					'https://letand.be/userMetadata'
				] as Auth0UserMeta['userMetadata'],
			};
			console.log('grab new JWKS took', Date.now() - start, 'ms');
			return next({
				ctx: {
					...ctx,
					accessToken,
				},
			});
		} catch (err) {
			// TODO remove in prod
			console.log(err, 'config.ts ~ 64');
			throw new TRPCError({ code: 'UNAUTHORIZED' });
		}
	});
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
