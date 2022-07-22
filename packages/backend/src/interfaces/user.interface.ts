import { AppAbility } from 'src/casl/casl-ability.factory';
import { ValidatedUserDto } from 'src/users/dto/user.dto';

export interface IUser extends ValidatedUserDto {
  ability: AppAbility;
  role: ValidatedUserDto['roles'][number];
}
