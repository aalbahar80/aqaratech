import {
	BadRequestException,
	ConflictException,
	HttpException,
	InternalServerErrorException,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

// TODO: review error messages
export const mapPrismaException = (
	exception: Prisma.PrismaClientKnownRequestError | Prisma.NotFoundError,
): HttpException => {
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
		// TODO: should be a 404 instead of a 400?
		responseError = new BadRequestException(exception.meta?.['cause']);
	} else if (exception.code === 'P2014') {
		/**
		 * P2014
		 * The change you are trying to make would violate the required relation 'LeaseToTenant' between the `Lease` and `Tenant` models.
		 * https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
		 *
		 */
		// TODO should we add a fallback error message?
		const meta = exception.meta;
		const modela = meta?.['model_a_name'];
		const modelb = meta?.['model_b_name'];
		let message = '';

		if (typeof modela === 'string' && typeof modelb === 'string') {
			message = `Sorry, but you can't delete a ${modelb} with an existing ${modela}. Please delete the ${modela} first.`;
		}

		responseError = new BadRequestException(message);
	} else if (exception.code === 'P2000') {
		/**
		 * P2000
		 * The provided value for the column is too long for the column's type. Column: {column_name}
		 *
		 * https://www.prisma.io/docs/reference/api-reference/error-reference#p2000
		 */
		responseError = new BadRequestException();
	} else if (exception.code === 'P2002') {
		/**
		 * P2002
		 * Unique constraint failed on the {constraint}
		 *
		 * https://www.prisma.io/docs/reference/api-reference/error-reference#p2002
		 *
		 */
		responseError = new ConflictException();
	} else if (exception.code === 'P2003') {
		/**
		 * P2003
		 * Foreign key constraint failed on the field: {field_name}
		 *
		 */
		responseError = new NotFoundException();
	} else {
		// TODO return error message?
		// TODO Test minimial error message (auto set in prod by Prisma)
		Logger.warn('Potentially unhandled Prisma error:', 'PrismaExceptionMapper');
		Logger.warn(exception, 'PrismaExceptionMapper');
		responseError = new InternalServerErrorException();
	}

	return responseError;
};
