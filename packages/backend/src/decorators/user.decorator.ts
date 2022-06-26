import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ValidatedUser } from 'src/types/user-validated.type';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<IRequest>();

    if (!request.user) {
      // In a public route, the jwt strategy is bypassed, so there won't be a user.
      // So either don't use this decorator in public routes, or try to get the user in a different way.

      // TODO decorator shouldn't throw 401, make jwt.strategy/jwtauthguard throw 401 instead
      throw new UnauthorizedException('No user found');
    }

    return request.user;
  },
);

interface IRequest extends Request {
  user?: ValidatedUser;
}
