import { Field } from '$lib/models/classes/Field.class';

export const OrganizationIdField = (value: string | undefined) =>
	new Field('organizationId', {
		required: true,
		disabled: true,
		hidden: true,
		value,
	});
