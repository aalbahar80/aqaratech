import {
	testOrgEmail,
	testPassword,
	testPortfolioEmail,
	testTenantEmail,
} from '@self/seed';

export const testUsers = [
	{
		roleType: 'ORGADMIN',
		email: testOrgEmail,
		password: testPassword,
		storageStatePath: 'storage-state/org-admin.json',
		storageStateFilename: 'org-admin.json',
	},
	{
		roleType: 'PORTFOLIO',
		email: testPortfolioEmail,
		password: testPassword,
		storageStatePath: 'storage-state/portfolio.json',
		storageStateFilename: 'portfolio.json',
	},
	{
		roleType: 'TENANT',
		email: testTenantEmail,
		password: testPassword,
		storageStatePath: 'storage-state/tenant.json',
		storageStateFilename: 'tenant.json',
	},
];
