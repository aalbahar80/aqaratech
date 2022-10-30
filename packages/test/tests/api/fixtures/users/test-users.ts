import {
	testOrgEmail,
	testPassword,
	testPortfolioEmail,
	testTenantEmail,
} from '@self/seed';

const orgAdmin = {
	roleType: 'ORGADMIN',
	email: testOrgEmail,
	password: testPassword,
	storageStatePath: 'storage-state/org-admin.json',
	storageStateFilename: 'org-admin.json',
} as const;

const portfolio = {
	roleType: 'PORTFOLIO',
	email: testPortfolioEmail,
	password: testPassword,
	storageStatePath: 'storage-state/portfolio.json',
	storageStateFilename: 'portfolio.json',
} as const;

const tenant = {
	roleType: 'TENANT',
	email: testTenantEmail,
	password: testPassword,
	storageStatePath: 'storage-state/tenant.json',
	storageStateFilename: 'tenant.json',
} as const;

export const testUsers = {
	orgAdmin,
	portfolio,
	tenant,
} as const;
