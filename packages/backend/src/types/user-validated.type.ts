import { Role } from '@prisma/client';
import { UserDto } from 'src/users/dto/user.dto';

/**
 * Type to be returned in /users-by-email endpoint,
 * then subsequently extracted by the jwt.strategy.ts
 * and placed in the request object.
 *
 * /users-by-email
 * Flow: user signs in through Auth0
 * -> Auth0 (Action) hits /users-by-email
 * -> Auth0 embeds response in access token metadata
 * -> jwt.strategy.ts extracts said metadata and places it in the request object
 */
export type ValidatedUser = UserDto & {
  roles: Role[];
};
