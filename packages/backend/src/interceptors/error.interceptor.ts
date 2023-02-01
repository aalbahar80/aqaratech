import { ForbiddenError } from '@casl/ability';
import {
	CallHandler,
	ExecutionContext,
	ForbiddenException,
	HttpException,
	Inject,
	Injectable,
	InternalServerErrorException,
	LoggerService,
	NestInterceptor,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Request } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { mapPrismaException } from 'src/prisma/prisma-exception-mapper';
import { UserDto } from 'src/users/dto/user.dto';

/**
 * An interceptor that remaps Prisma & Casl errors to NestJS exceptions.
 * Using an interceptor (rather than an exception filter) allows the
 * logging interceptor to log the error after it has been remapped.
 *
 * Request lifecycle diagram: https://i.stack.imgur.com/2lFhd.jpg
 * Request lifecycle docs: https://docs.nestjs.com/faq/request-lifecycle#request-lifecycle
 *
 * Interceptor Example: https://docs.nestjs.com/interceptors#exception-mapping
 */
@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
	constructor(
		@Inject(WINSTON_MODULE_NEST_PROVIDER)
		private readonly logger: LoggerService,
	) {}

	intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
		const request = context.switchToHttp().getRequest<Request>();
		const user = request.user as UserDto;

		return next.handle().pipe(
			catchError((err) => {
				if (err instanceof Error) {
					this.logger.error({
						message: err.message,
						stack: err.stack,
						cause: err.cause,
					});
				} else {
					this.logger.error(err);
				}

				return throwError(() => {
					if (err instanceof HttpException) {
						// We don't want to remap HTTP exceptions
						return err;
					}
					// TODO add err.message where appropriate
					if (err instanceof ForbiddenError) {
						this.logger.debug?.(
							`User with id: ${user.id} email: ${
								user.email
							} - is forbidden to - ${err.action as string} - ${
								err.subjectType
							} - ${err.subject as string}`,
						);

						return new ForbiddenException();
					} else if (
						err instanceof Prisma.NotFoundError ||
						err instanceof Prisma.PrismaClientKnownRequestError
					) {
						return mapPrismaException(err, request.method);
					} else {
						this.logger.verbose?.('Unknown error. Returning 500');
						return new InternalServerErrorException();
					}
				});
			}),
		);
	}
}
