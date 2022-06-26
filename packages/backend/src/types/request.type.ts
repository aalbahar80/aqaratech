import type { Request } from 'express';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { UserDto } from 'src/users/dto/user.dto';

// TODO remove optional from user/ability
export type TRequest = Request & { user: UserDto; ability?: AppAbility };
