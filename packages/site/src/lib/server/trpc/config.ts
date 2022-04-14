import type { createTRPCHandle } from '$lib/server/trpc';
import type { RequestEvent } from '@sveltejs/kit/types/private';
import {
	router as trpcRouter,
	TRPCError,
	type inferAsyncReturnType,
} from '@trpc/server';
import * as jose from 'jose';

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
			const JWKS = jose.createLocalJWKSet({
				keys: [
					{
						alg: 'RS256',
						kty: 'RSA',
						use: 'sig',
						n: 'ty7ykF-72NiokwwsZJR3t15VMS2SGAzxac-DkPpRSsYtMsKVgBBt-jCdKeHkAt_k8vphRFyjFm8k-a-TNTCWtGnHP9LWQK4s6ZTNzktAHb_qbNg8kfV8cYvQGO-X0UCGmg7h3BHpBTx5IZFBSeG3MLRyfEvjZS0Ys8XrB5e3pS8KgkaUgcEB9wAXRwg0w7ZpAns6rq_7KEvZX_vEsufzcIFMF3dLIywXnN493Y186qf6bx-tW-NsXzZd6qtvxW03_xVMlgMXRvlY-BEs_uk1dhYndo9mz8kSYm1dLjyt-5EcIqUnPxXA46-Pqd6cAAgUCPfu439es850P1JVd9CYgQ',
						e: 'AQAB',
						kid: 'eoJj1hlBuhYdXt6cym6m3',
						x5t: 'njrntKD4tsaJWk1BQB8WAlHdVas',
						x5c: [
							'MIIDDTCCAfWgAwIBAgIJRejdsvKplhN/MA0GCSqGSIb3DQEBCwUAMCQxIjAgBgNVBAMTGWRldi1lZWh2aGRwMi5ldS5hdXRoMC5jb20wHhcNMjExMjExMTgyNDI3WhcNMzUwODIwMTgyNDI3WjAkMSIwIAYDVQQDExlkZXYtZWVodmhkcDIuZXUuYXV0aDAuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAty7ykF+72NiokwwsZJR3t15VMS2SGAzxac+DkPpRSsYtMsKVgBBt+jCdKeHkAt/k8vphRFyjFm8k+a+TNTCWtGnHP9LWQK4s6ZTNzktAHb/qbNg8kfV8cYvQGO+X0UCGmg7h3BHpBTx5IZFBSeG3MLRyfEvjZS0Ys8XrB5e3pS8KgkaUgcEB9wAXRwg0w7ZpAns6rq/7KEvZX/vEsufzcIFMF3dLIywXnN493Y186qf6bx+tW+NsXzZd6qtvxW03/xVMlgMXRvlY+BEs/uk1dhYndo9mz8kSYm1dLjyt+5EcIqUnPxXA46+Pqd6cAAgUCPfu439es850P1JVd9CYgQIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBQN/ULMKyknpAz/wFNJBR4muJYX1jAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEBAHWubNrAQqT/PAqd56CaFps6MAGrWCuV/YjskxodbuIjoIvO9wm5bNTnTerDsirsiDF9wwl2VhH+Zu1DbEJteIrRcIhFGjAOudw5Ix9m4gn7biqMBd1z6mTBXfEpLtywCYoL1rbuNqM9yD7JjrE/bDytZh/kzIT7s0KKXFVtxx1l1HFd4+V/y0mSWQ/o+eyEFNyEZD//lZnGwPA/EaE3bp6Y5iQWF7KvzRWvU9W2ExS9JnzsldX3OeLhQ7+p+azfRe7ERuJV7V3i1oiNbpSwEs907q2ilVoCYY4Kp05OqrseaLG+HL77qMaMfXKVbGY2rFWdipTBCYWyMXWvyzbHy5A=',
						],
					},
					{
						alg: 'RS256',
						kty: 'RSA',
						use: 'sig',
						n: 'v8KzFwNyNceQjfs1IXqjwOCgqMss507TUA3F_U-RoZmrnclbcxjuI4WE1_iFgRFnKdFOxpr5oJhGvI3pp4k8Oq_HbHNchoXk00Jd4sqykKeCSCSxliJpKlIrvB4DIBOkQeX6ihoqEY6-YXQ0BcSvvXeUh6jJxypnuK6731FwJ32LcOmJCLIeHtF2VZwv3IpJPFWyGuB5AcEDfB0VfpoHuk6QBNEgi9U10I_gJDGDdY7BCwTXshMvWaGY_TbOLb5eC1y4dZAp_CGh5LURjmTe2h91xBCu9W8Vu6n-kTHAfjizm-6kXxe7HQTRYWEwwDdt3f9iOTU-kH502JKgOxz6bw',
						e: 'AQAB',
						kid: 'kXp8dyTMzfS5656AC2_gb',
						x5t: 'eOBBAgZpY4GYgOweWhKzrJw7_QM',
						x5c: [
							'MIIDDTCCAfWgAwIBAgIJNkWczeRHeBpRMA0GCSqGSIb3DQEBCwUAMCQxIjAgBgNVBAMTGWRldi1lZWh2aGRwMi5ldS5hdXRoMC5jb20wHhcNMjExMjExMTgyNDI3WhcNMzUwODIwMTgyNDI3WjAkMSIwIAYDVQQDExlkZXYtZWVodmhkcDIuZXUuYXV0aDAuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv8KzFwNyNceQjfs1IXqjwOCgqMss507TUA3F/U+RoZmrnclbcxjuI4WE1/iFgRFnKdFOxpr5oJhGvI3pp4k8Oq/HbHNchoXk00Jd4sqykKeCSCSxliJpKlIrvB4DIBOkQeX6ihoqEY6+YXQ0BcSvvXeUh6jJxypnuK6731FwJ32LcOmJCLIeHtF2VZwv3IpJPFWyGuB5AcEDfB0VfpoHuk6QBNEgi9U10I/gJDGDdY7BCwTXshMvWaGY/TbOLb5eC1y4dZAp/CGh5LURjmTe2h91xBCu9W8Vu6n+kTHAfjizm+6kXxe7HQTRYWEwwDdt3f9iOTU+kH502JKgOxz6bwIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBTi2sNJ+6yTS+Z9Oq6N7BfTA/YpWTAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEBAJvwdAx1URTyuRFFrM6ZUpU95+a9J2zF9OCuMtT0waAkldkbi63oRNdds9YKWdIAc44IlY8HyirmCuDjy1v3nVbUoya97aOnc/HaBr9ZO2ohr5N8hoSf4fqqyxKVGmrSZCSxYpZC1VkD6tpVNGYkzwjZa/J4HwQWYWGNWFO2Veajl4kSOOLqVO0yJK6niG4GiEQhRprmkGNkyInv8PUgnWo6yXHYmtkdvai43l8RVrntrgo1i1ZWi8XnJOQBQg6dGFbYR1R5/wRHAVCd9VaOVTsEWpFJnKSItsGkCB116OkolMIU1+didV2ec9uGrN7f71tgx6vNy2NLVPn/l26DCLw=',
						],
					},
				],
			});
			// TODO use .env
			// const JWKS = jose.createRemoteJWKSet(
			// 	new URL('https://dev-eehvhdp2.eu.auth0.com/.well-known/jwks.json'),
			// );
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

type Ctx = Parameters<
	Parameters<ReturnType<typeof createRouter>['middleware']>['0']
>['0']['ctx'];
export const isOwner = (ctx: Ctx): boolean =>
	ctx.accessToken.roles.includes('property-owner');

export const isAdmin = (ctx: Ctx): boolean =>
	ctx.accessToken.roles.includes('admin');
