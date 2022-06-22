import { createParamDecorator, ExecutionContext, Header } from '@nestjs/common';
import { ROLE_HEADER_NAME } from 'src/constants/header-role';
import { TRequest } from 'src/types/request.type';

/**
 * @description
 * Decorator to get the `organizationId` from the user's roles
 * according to the `x-role-id` header.
 */
export const Org = createParamDecorator<string>(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<TRequest>();
    const roles = request.user!.roles; // TODO ensure user exists at this point
    const currentRoleId = request.get(ROLE_HEADER_NAME);

    const orgId = roles.find(
      (role) => role.id === currentRoleId,
    )?.organizationId;
    return orgId;
  },
);
