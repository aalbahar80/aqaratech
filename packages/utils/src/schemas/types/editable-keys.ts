/**
 * These keys are not exposed to the user through the form.
 * Instead, we add them to the form data before submitting it.
 */
export type EditableSchemaKeys<Key extends string> = Exclude<
	Key,
	'organizationId' | 'portfolioId' | 'propertyId' | 'unitId' | 'leaseId'
>;
