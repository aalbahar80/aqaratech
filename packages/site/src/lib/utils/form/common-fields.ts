import { Field } from '$lib/models/classes/Field.class';

export const OrganizationIdField = (value: string | undefined) =>
	new Field('organizationId', {
		required: true,
		disabled: true,
		hidden: true,
		value,
	});

export const PortfolioIdField = (value: string | undefined) =>
	new Field('portfolioId', {
		required: true,
		disabled: true,
		hidden: true,
		value,
	});
