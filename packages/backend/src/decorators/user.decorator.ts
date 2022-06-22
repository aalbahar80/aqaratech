import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { TRequest } from 'src/types/request.type';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<TRequest>();

    if (!request.user) {
      // In a public route, the jwt strategy is bypassed, so there won't be a user.
      // So either don't use this decorator in public routes, or try to get the user in a different way.
      throw new UnauthorizedException('No user found');
    }

    return request.user;
  },
);
