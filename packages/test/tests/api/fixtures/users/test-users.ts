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

const freshUser = {
	roleType: 'FRESH',
	email: 'dev.tester.1@mailthink.net',
	password: 'cloud12',
	storageStatePath: 'storage-state/fresh-user.json',
	storageStateFilename: 'fresh-user.json',
} as const;

const aqaratechStaff = {
	roleType: 'AQARATECH_STAFF',
	email: 'staff.demo@mailthink.net',
	password: testPassword,
	storageStatePath: 'storage-state/aqaratech-staff.json',
	storageStateFilename: 'aqaratech-staff.json',
} as const;

export const testUsers = {
	orgAdmin,
	portfolio,
	tenant,
	freshUser,
	aqaratechStaff,
} as const;
