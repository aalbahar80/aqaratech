const API = ['**/tests/api/**/*.spec.ts', '**/tests/search/variants.spec.ts'];
const NON_SITE = [...API];
const MOBILE_ONLY = ['**/tests/components/sidebar.spec.ts'];
const DESKTOP_ONLY: string[] = [
	// '**/tests/components/expense-tree/drag.spec.ts',
];

export const TESTS = {
	API,
	NON_SITE,
	MOBILE_ONLY,
	DESKTOP_ONLY,
};
