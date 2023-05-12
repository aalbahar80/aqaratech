const BILLING = ['**/tests/billing/**/*.spec.ts', '**/tests/pay/**/*.spec.ts'];
const API = ['**/tests/api/**/*.spec.ts', '**/tests/search/variants.spec.ts'];
const NON_SITE = [...API, ...BILLING];
const MOBILE_ONLY = ['**/tests/components/sidebar.spec.ts'];
const DESKTOP_ONLY: string[] = [
	// '**/tests/components/expense-tree/drag.spec.ts',
	'**/tests/dashboard/lease-table.spec.ts',
];

/** Some tests, especially those that are slow or don't work well in parallel,
 * should only be run in the main project. */
const MAIN_ONLY = ['**/tests/search/search-authz.spec.ts'];

export const TESTS = {
	API,
	NON_SITE,
	MOBILE_ONLY,
	DESKTOP_ONLY,
	MAIN_ONLY,
	BILLING,
};
