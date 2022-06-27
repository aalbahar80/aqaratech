import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter
  implements ExceptionFilter<Prisma.PrismaClientKnownRequestError>
{
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.debug(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let responseError: HttpException;

    /**
     * P2025
     * An operation failed because it depends on one or more records that were required but not found. {cause}
     * https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
     *
     * P2014
     * The change you are trying to make would violate the required relation 'LeaseToTenant' between the `Lease` and `Tenant` models.
     * https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
     */
    if (exception.code === 'P2025') {
      responseError = new BadRequestException(exception.meta?.cause);
    } else if (exception.code === 'P2014') {
      // TODO should we add a fallback error message?
      const modela = exception.meta?.model_a_name;
      const modelb = exception.meta?.model_b_name;
      const message = `Sorry, but you can't delete a ${modelb} with an existing ${modela}. Please delete the ${modela} first.`;
      responseError = new BadRequestException(message);
    } else {
      // TODO return error message?
      // TODO Test minimial error message (auto set in prod by Prisma)
      responseError = new BadRequestException(); // change to 500?
    }

    response
      .status(responseError.getStatus())
      .json(responseError.getResponse());
  }
}
