import { landing } from './landing';

import type { BaseTranslation } from '../i18n-types';

const en: BaseTranslation = {
	HI: 'Hi {name:string}! Please leave a star if you like this project: https://github.com/ivanhofer/typesafe-i18n',
	log: `This log was called from '{fileName:string}'`,
	buttons: {
		login: 'Log in',
		contact: 'Contact us',
	},
	secondaryFeatures: {
		managers: {
			summary: 'For property managers',
			name: 'Streamline your workflows',
			description:
				'Leverage our powerful tools to keep track of all your properties. Aqaratech helps you organize your business and work more efficiently.',
		},
		owners: {
			summary: 'For owners',
			name: 'Complete visibility',
			description:
				'Use our dashboard to access and monitor all of your property information, granting you peace of mind helping you make informed decisions.',
		},
		tenants: {
			summary: 'For tenants',
			name: 'Hassle-free rentals',
			description:
				'Aqaratech simplifies the rental process by allowing tenants to track their payments and leases.',
			// 'Aqaratech simplifies the rental process by allowing tenants to pay their rent at any time, from any device.',
		},
	},
	landing,
};

export default en;
