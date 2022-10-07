import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { isHealthCheck } from '@self/utils';
import { IS_PUBLIC_KEY } from 'src/auth/public.decorator';

/**
 * Decorator that verifies jwt token, and if it's valid, injects user into request.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	constructor(private reflector: Reflector) {
		super();
	}

	private readonly logger = new Logger(JwtAuthGuard.name);

	async canActivate(context: ExecutionContext) {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		if (isPublic) {
			const url = context.switchToHttp().getRequest().url;
			if (!isHealthCheck(url)) {
				this.logger.debug('Public route, skipping jwt auth guard');
			}
			return true;
		}

		this.logger.debug('Enforcing jwt-auth.guard');
		return super.canActivate(context) as Promise<boolean>;
	}
}
