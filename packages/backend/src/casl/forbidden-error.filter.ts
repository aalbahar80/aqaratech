import { ForbiddenError } from '@casl/ability';
import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	ForbiddenException,
	Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { UserDto } from 'src/users/dto/user.dto';

@Catch(ForbiddenError)
export class CaslExceptionFilter
	implements ExceptionFilter<ForbiddenError<AppAbility>>
{
	private readonly logger = new Logger(CaslExceptionFilter.name);

	catch(exception: ForbiddenError<AppAbility>, host: ArgumentsHost) {
		const ctx = host.switchToHttp();

		// log user details
		const request = ctx.getRequest<Request>();
		const user = request.user as UserDto;
		const userSummary = { id: user.id, email: user.email };
		this.logger.debug({ ...userSummary });

		// log exception details
		const response = ctx.getResponse<Response>();

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { ability, ...exceptionDetails } = exception;
		// TODO monitor
		this.logger.debug({ ...exceptionDetails });
		this.logger.warn(
			`User: ${JSON.stringify(userSummary)} - is forbidden to - ${
				exception.action
			} - ${exception.subjectType} - ${JSON.stringify(exception.subject)}`,
		);

		// respond with 403
		const responseError = new ForbiddenException();
		this.logger.log(`Response: ${JSON.stringify(responseError)}`);
		response
			.status(responseError.getStatus())
			.json(responseError.getResponse());
	}
}
