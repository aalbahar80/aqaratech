import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { Strategy } from 'passport-jwt';
import { z } from 'zod';

import { AQARATECH_STAFF_ROLE, Cookie } from '@self/utils';
import { authConfig } from 'src/config/auth.config';
import { backendEnvSchema } from 'src/env/env.schema';
import { EnvService } from 'src/env/env.service';
import { AuthenticatedUser } from 'src/interfaces/user.interface';
import { UsersService } from 'src/users/users.service';

import type { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly env: EnvService,
		readonly usersService: UsersService,
	) {
		const auth = authConfig(backendEnvSchema.parse(process.env));

		const domain = auth.AUTH0_DOMAIN;
		const audience = auth.AUTH0_API_AUDIENCE;
		const jwks = auth.JWKS;

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
		const apiNamespace = this.env.auth.AUTH0_API_NAMESPACE;

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
