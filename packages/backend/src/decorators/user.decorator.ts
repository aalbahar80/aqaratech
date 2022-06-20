import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TRequest } from 'src/types/request.type';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<TRequest>();
    return request.user;
  },
);
