import { ForbiddenError } from '@casl/ability';
import {
	BadGatewayException,
	CallHandler,
	ExecutionContext,
	ForbiddenException,
	Injectable,
	Logger,
	NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
	private readonly logger = new Logger(ErrorsInterceptor.name);

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
					} else {
						// TODO handle prisma errors
						return new BadGatewayException();
					}
				});
			}),
		);
	}
}

// const errorMap = {
// 	ForbiddenError: ForbiddenException,
// }
