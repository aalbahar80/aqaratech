import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TRequest } from 'src/types/request.type';

/**
 * Decorator to extract ability from request, which is set by the abilities guard.
 */
export const Ability = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<TRequest>();
    return request.ability;
  },
);
