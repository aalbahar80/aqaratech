import { permittedFieldsOf } from '@casl/ability/extra';
import { instanceToPlain } from 'class-transformer';
import * as R from 'remeda';
import { Action } from 'src/casl/action.enum';
import { IUser } from 'src/interfaces/user.interface';

// TODO move to class?
/**
 * Strip out fields that are not permitted to be updated by the user.
 */
export const frisk = <T extends Record<string, any>>({
	user,
	SubjectType,
	instance,
}: {
	user: IUser;
	SubjectType: any;
	instance: T;
}) => {
	const fields = R.keys(instanceToPlain(instance));
	const permittedFields = permittedFieldsOf(
		user.ability,
		Action.Update,
		SubjectType,
		{ fieldsFrom: (rule) => rule.fields || fields },
	);
	// TODO log difference
	const frisked = R.pick(instance, permittedFields);
	return frisked;
};
