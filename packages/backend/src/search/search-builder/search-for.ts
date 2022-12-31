import { fieldSearchBuilder } from './field-search-builder';

/** Defines the scalar fields we want to search for. Takes a an array of
 * strings and returns an array of search builders. Non-scalar fields should be
 * handled separately. Ex. tenant.role.user.email */
export const searchFor = (fields: string[], query: string) => {
	const array = fields.map((field) => fieldSearchBuilder(field, query));

	return array.flat();
};
