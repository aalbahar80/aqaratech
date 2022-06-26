import type { Request } from 'express';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { UserDto } from 'src/users/dto/user.dto';

export interface IUser extends UserDto {
  ability: AppAbility;
}
// TODO remove optional from user/ability
export type TRequest = Request & { user: IUser };
export type TRequestWUser = Request & { user: UserDto };
