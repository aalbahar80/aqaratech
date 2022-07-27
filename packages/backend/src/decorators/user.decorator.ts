import {
  BadGatewayException,
  createParamDecorator,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthenticatedUser, IUser } from 'src/interfaces/user.interface';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<IRequest>();
    const logger = new Logger('UserDecorator');

    if (!request.user) {
      // In a public route, both jwt.guard/strategy and abilities.guard are bypassed, so request.user is undefined.
      // Therefore, either don't use this decorator in public routes, or try to get the user in a different way.

      logger.error(
        "User not found in request. This decorator shouldn't be used in public routes.",
      );
      throw new BadGatewayException();
    }

    logger.debug(`User email: ${request.user.email}`);
    return request.user;
  },
);

/**
 * User could be undefined if we use this decorator in a public route.
 */
interface IRequest extends Request {
  user?: AuthenticatedUser | IUser | undefined;
}
