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
	storageStateFilename: 'org-admin.json',
} as const;

const portfolio = {
	roleType: 'PORTFOLIO',
	email: testPortfolioEmail,
	password: testPassword,
	storageStateFilename: 'portfolio.json',
} as const;

const tenant = {
	roleType: 'TENANT',
	email: testTenantEmail,
	password: testPassword,
	storageStateFilename: 'tenant.json',
} as const;

const freshUser = {
	roleType: 'FRESH',
	email: 'dev.tester.1@mailthink.net',
	password: testPassword,
	storageStateFilename: 'fresh-user.json',
} as const;

export const testUsers = {
	orgAdmin,
	portfolio,
	tenant,
	freshUser,
} as const;
