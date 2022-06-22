import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
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
    let orgId;

    if (currentRoleId) {
      orgId = roles.find((role) => role.id === currentRoleId)?.organizationId;
    } else {
      // TODO: consider getting from the user's default role in settings

      // get the first role with a non-null organizationId
      orgId = roles.find((role) => role.organizationId)?.organizationId;
    }
    if (!orgId) {
      throw new InternalServerErrorException('No organizationId found');
    }
    return orgId;
  },
);
