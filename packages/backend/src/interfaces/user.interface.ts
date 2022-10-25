import { TAppAbility } from 'src/casl/abilities/ability-types';
import { ValidatedUserDto } from 'src/users/dto/user.dto';

/**
 * The type of request.user after it has passed jwt.strategy.
 * Only contains the user's email. At this point,
 * all we know is that the user is authenticated from auth0 with this email.
 * User might not exist in our database at this point yet.
 * TODO: add isEmailVerified to this type.
 *
 * We should expect a user of this type if we use `@SkipAbilityCheck()` on a route handler.
 */
export interface AuthenticatedUser {
	email: string;

	/**
	 * Whether the user has an `aqaratech-staff` role set in their auth0 profile.
	 */
	isAqaratechStaff: boolean;
}

/**
 *
 * AKA `AuthorizedUser`.
 * The type of request.user after it has passed abilities guard.
 * At this point, we have identified the user in our database.
 * And attached that info to the request.user.
 * Additionally, we have calculated and attached the user's ability.
 */
export interface IUser extends ValidatedUserDto {
	ability: TAppAbility;
	role: ValidatedUserDto['roles'][0]; // TODO rm?
	isAqaratechStaff: false;
}
