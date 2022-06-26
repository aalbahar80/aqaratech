import { ForbiddenError } from '@casl/ability';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
} from '@nestjs/common';
import { Response } from 'express';
import { AppAbility } from 'src/casl/casl-ability.factory';

@Catch(ForbiddenError)
export class CaslExceptionFilter
  implements ExceptionFilter<ForbiddenError<AppAbility>>
{
  catch(exception: ForbiddenError<AppAbility>, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let responseError = new ForbiddenException();

    response
      .status(responseError.getStatus())
      .json(responseError.getResponse());
  }
}
