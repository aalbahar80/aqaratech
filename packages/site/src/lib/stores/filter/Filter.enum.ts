export const FilterEnum = {
	Range: 'filter:range',
	Property: 'filter:property',
	Unit: 'filter:unit',
};

/**
 * Key to use for storing any intial filter value in the URL. The value is used
 * to initialize the filter store in +layout.ts. Then, the key-value pair is
 * removed from the URL in afterNavigate in +layout.svelte.
 */
export const FilterInitial = {
	Property: 'initialPropertyId',
	Unit: 'initialUnitId',
};
