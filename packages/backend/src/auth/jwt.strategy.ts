import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { AQARATECH_STAFF_ROLE, Cookie } from '@self/utils';
import type { Request } from 'express';
import { passportJwtSecret } from 'jwks-rsa';
import { Strategy } from 'passport-jwt';
import * as R from 'remeda';
import { EnvironmentConfig } from 'src/interfaces/environment.interface';
import { AuthenticatedUser } from 'src/interfaces/user.interface';
import { UsersService } from 'src/users/users.service';
import { z } from 'zod';

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
			const cookies = req.cookies as Record<string, string> | undefined;

			const token = cookies?.[Cookie.accessToken];

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

	private readonly logger = new Logger(JwtStrategy.name);

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

		const payload = R.isObject(rawPayload) ? rawPayload : undefined;

		const rawEmail = payload?.[`${apiNamespace}/email`];

		const email = z.string().email().parse(rawEmail);

		const auth0Roles = z
			.array(z.string())
			.parse(payload?.[`${apiNamespace}/roles`]);

		const isAqaratechStaff = auth0Roles.includes(AQARATECH_STAFF_ROLE);

		this.logger.debug(`Validated user with email ${email}`);

		return { email, isAqaratechStaff };
	}
}
