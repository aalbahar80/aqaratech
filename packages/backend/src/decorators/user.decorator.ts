import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDto } from 'src/users/dto/user.dto';

export const User = createParamDecorator<UserDto>(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserDto;
  },
);
