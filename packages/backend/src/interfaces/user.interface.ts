import { AppAbility } from 'src/casl/casl-ability.factory';
import { ValidatedUser } from 'src/types/user-validated.type';

export interface IUser extends ValidatedUser {
  ability: AppAbility;
}
