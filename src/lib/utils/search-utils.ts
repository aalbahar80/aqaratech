import type { Field } from '$components/form/Field';

export const constructFilter = (searchTerm: string, fieldList: Field[]) => {
	if (!searchTerm) {
		return {};
	}
	return {
		_or: fieldList
			// disregard number fields if search term isn't a number
			.filter((f) =>
				parseInt(searchTerm, 10)
					? f.searchable
					: f.searchable && f.searchType === 'text',
			)
			.map((f) => {
				// number scalars use _eq operator
				if (f.searchType === 'number') {
					return {
						[f.fieldName]: { _eq: parseInt(searchTerm, 10) },
					};
				}
				// text scalars use %_ilike% operator
				if (f.searchType === 'text') {
					return {
						[f.fieldName]: { _ilike: `%${searchTerm}%` },
					};
				}

				console.warn(
					'Unknown search type. Search type should be handled.',
					f.searchType,
				);
				return {};
			}),
	};
};
