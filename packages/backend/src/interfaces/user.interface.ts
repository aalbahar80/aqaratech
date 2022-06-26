import { AppAbility } from 'src/casl/casl-ability.factory';
import { UserDto } from 'src/users/dto/user.dto';

export interface IUser extends UserDto {
  ability: AppAbility;
}
