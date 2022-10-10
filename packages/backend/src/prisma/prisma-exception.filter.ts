import {
	BadRequestException,
	Catch,
	ExceptionFilter,
	HttpException,
	InternalServerErrorException,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

// This filter is used to catch Prisma exceptions and convert them to NestJS exceptions.
// Can also be implemented as an interceptor. Example: https://docs.nestjs.com/interceptors#exception-mapping

@Catch(Prisma.PrismaClientKnownRequestError, Prisma.NotFoundError)
export class PrismaExceptionFilter
	implements
		ExceptionFilter<
			Prisma.PrismaClientKnownRequestError | Prisma.NotFoundError
		>
{
	private readonly logger = new Logger(PrismaExceptionFilter.name);

	catch(
		exception: Prisma.PrismaClientKnownRequestError | Prisma.NotFoundError,
	) {
		this.logger.debug(exception);

		let responseError: HttpException;

		if (exception instanceof Prisma.NotFoundError) {
			responseError = new NotFoundException();
		} else if (exception.code === 'P2025') {
			/**
			 * P2025
			 * An operation failed because it depends on one or more records that were required but not found. {cause}
			 * https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
			 *
			 */
			responseError = new BadRequestException(exception.meta?.cause);
		} else if (exception.code === 'P2014') {
			/**
			 * P2014
			 * The change you are trying to make would violate the required relation 'LeaseToTenant' between the `Lease` and `Tenant` models.
			 * https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
			 *
			 */
			// TODO should we add a fallback error message?
			const modela = exception.meta?.model_a_name;
			const modelb = exception.meta?.model_b_name;
			const message = `Sorry, but you can't delete a ${modelb} with an existing ${modela}. Please delete the ${modela} first.`;
			responseError = new BadRequestException(message);
		} else {
			// TODO return error message?
			// TODO Test minimial error message (auto set in prod by Prisma)
			this.logger.warn('Potentially unhandled Prisma error:', exception);
			responseError = new InternalServerErrorException();
		}

		throw responseError;
	}
}
