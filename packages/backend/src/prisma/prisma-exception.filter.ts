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
    console.error(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let responseError: HttpException;

    if (exception.code === 'P2025') {
      responseError = new BadRequestException(exception.meta?.cause);
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
