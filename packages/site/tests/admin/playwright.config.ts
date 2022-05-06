import type { PlaywrightTestConfig } from '@playwright/test';
import { config as baseConfig } from '../config.js';
import type { formClasses } from './form.js';

export type FormFixtures = { baseForm: keyof typeof formClasses };
type Config = PlaywrightTestConfig<FormFixtures>;

const commonForms = ['newForm.test.ts'];

const config: Config = {
	...baseConfig,
	projects: [
		{
			name: 'general',
			testMatch: ['lease.test.ts', 'property.test.ts'],
		},
		{
			name: 'client',
			use: { baseForm: 'clients' },
			testMatch: commonForms,
		},
		{
			name: 'tenant',
			use: { baseForm: 'tenants' },
			testMatch: commonForms,
		},
		{
			name: 'property',
			use: { baseForm: 'properties' },
			testMatch: commonForms,
		},
		{
			name: 'unit',
			use: { baseForm: 'units' },
			testMatch: commonForms,
		},
		{
			name: 'expense',
			use: { baseForm: 'expenses' },
			testMatch: commonForms,
		},
		{
			name: 'maintenanceOrder',
			use: { baseForm: 'maintenanceOrders' },
			testMatch: commonForms,
		},
		{
			name: 'lease',
			use: { baseForm: 'leases' },
			testMatch: commonForms,
		},
	],
};

export default config;
