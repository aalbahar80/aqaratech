import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { Strategy } from 'passport-jwt';
import { z } from 'zod';

import { AQARATECH_STAFF_ROLE, Cookie } from '@self/utils';

import { EnvironmentConfig } from 'src/interfaces/environment.interface';
import { AuthenticatedUser } from 'src/interfaces/user.interface';
import { UsersService } from 'src/users/users.service';

import type { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		readonly configService: ConfigService<EnvironmentConfig>,
		readonly usersService: UsersService,
	) {
		const domain = configService.get('authConfig.AUTH0_DOMAIN', {
			infer: true,
		});

		const audience = configService.get('authConfig.AUTH0_API_AUDIENCE', {
			infer: true,
		});

		const jwks = configService.get('authConfig.JWKS', { infer: true });

		if (!domain || !audience || !jwks) {
			throw new Error(
				'authConfig.AUTH0_DOMAIN and authConfig.AUTH0_API_AUDIENCE must be set',
			);
		}

		const cookieExtractor = function (req: Request) {
			const cookiesSchema = z.object({
				[Cookie.accessToken]: z.string().optional(),
			});

			const cookies = cookiesSchema.parse(req.cookies);

			const token = cookies[Cookie.accessToken];

			if (!token) {
				Logger.debug('No cookie token found');
			}

			return token;
		};

		super({
			// https://github.com/mikenicholson/passport-jwt#configure-strategy
			secretOrKeyProvider: passportJwtSecret({
				cache: true,
				cacheMaxAge: 1000 * 60 * 60 * 24, // 24 hours
				rateLimit: true,
				jwksUri: `${domain}/.well-known/jwks.json`,
				// More info: https://github.com/auth0/node-jwks-rsa#loading-keys-from-local-file-environment-variable-or-other-externals
				// eslint-disable-next-line @typescript-eslint/require-await
				getKeysInterceptor: async () => {
					return jwks.keys;
				},
			}),
			jwtFromRequest: cookieExtractor,
			audience,
			domain,
			algorithms: ['RS256'],
		});
	}

	/**
	 * Decorator that serves as an Authorization check only.
	 * It verifies the jwt token, and if it's valid, injects user's email into request.user
	 *
	 * @param rawPayload
	 * access token as received from Auth0
	 */
	validate(rawPayload: unknown): AuthenticatedUser {
		const apiNamespace = this.configService.get(
			'authConfig.AUTH0_API_NAMESPACE',
			{ infer: true },
		);

		if (!apiNamespace) {
			throw new Error('authConfig.AUTH0_API_NAMESPACE must be set');
		}

		const payload = payloadSchema(apiNamespace).parse(rawPayload);

		const emailKey = `${apiNamespace}/email`;
		const email = z.string().parse(payload[emailKey]);

		const rolesKey = `${apiNamespace}/roles`;
		const roles = z.array(z.string()).parse(payload[rolesKey]);

		const isAqaratechStaff = roles.includes(AQARATECH_STAFF_ROLE);

		return { email, isAqaratechStaff };
	}
}

const payloadSchema = (namespace: string) =>
	z.object({
		[`${namespace}/email`]: z.string().email(),
		[`${namespace}/roles`]: z.array(z.string()),
	});
