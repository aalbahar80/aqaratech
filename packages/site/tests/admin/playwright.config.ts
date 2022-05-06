import path from 'path';
import { config as baseConfig } from '../config.js';
import type { formClasses } from './form.js';

export type FormFixtures = { baseForm: keyof typeof formClasses };

const commonForms = ['newForm.test.ts'];
const config = {
	...baseConfig,
	storageState: path.resolve(__dirname, '../adminState.json'),
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
	],
};

export default config;
