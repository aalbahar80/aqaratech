import { ForbiddenError } from '@casl/ability';
import {
	BadGatewayException,
	BadRequestException,
	CallHandler,
	ConflictException,
	ExecutionContext,
	ForbiddenException,
	HttpException,
	Injectable,
	Logger,
	NestInterceptor,
	NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Request } from 'express';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
	private readonly logger = new Logger(ErrorsInterceptor.name);

	private errorCodesStatusMapping: ErrorCodesStatusMapping = {
		P2000: BadRequestException,
		P2002: ConflictException,
		P2014: BadRequestException,
		P2025: NotFoundException,
	};

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const request = context.switchToHttp().getRequest<Request>();
		const user = request.user as UserDto;

		return next.handle().pipe(
			catchError((err) => {
				this.logger.error(err);
				return throwError(() => {
					// TODO add err.message where appropriate
					if (err instanceof ForbiddenError) {
						this.logger.debug(
							`User with id: ${user.id} email: ${user.email} - is forbidden to - ${err.action} - ${err.subjectType} - ${err.subject}`,
						);

						return new ForbiddenException();
					} else if (err instanceof Prisma.NotFoundError) {
						return new NotFoundException();
					} else if (err instanceof Prisma.PrismaClientKnownRequestError) {
						return new this.errorCodesStatusMapping[err.code]();
					} else {
						// return new InternalServerErrorException(); // or InternalServerErrorException
						return new BadGatewayException(); // or InternalServerErrorException
					}
				});
			}),
		);
	}
}

export type ErrorCodesStatusMapping = {
	[key: string]: new () => HttpException;
};
