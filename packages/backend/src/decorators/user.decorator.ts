import {
  createParamDecorator,
  ExecutionContext,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ValidatedUserDto } from 'src/users/dto/user.dto';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<IRequest>();
    const logger = new Logger('UserDecorator');

    logger.debug(`user: ${request.user}`);

    if (!request.user) {
      // In a public route, the jwt strategy is bypassed, so there won't be a user.
      // So either don't use this decorator in public routes, or try to get the user in a different way.

      // TODO decorator shouldn't throw 401, make jwt.strategy/jwtauthguard throw 401 instead
      logger.warn(
        "User not found in request. This decorator shouldn't be used in public routes.",
      );
      throw new UnauthorizedException('No user found');
    }

    return request.user;
  },
);

interface IRequest extends Request {
  user?: ValidatedUserDto;
}
