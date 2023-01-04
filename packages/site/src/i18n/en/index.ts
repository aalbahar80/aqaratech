import { entity } from './entity';
import { landing } from './landing';

import type { BaseTranslation } from '../i18n-types';

const en: BaseTranslation = {
	entity,
	buttons: {
		login: 'Log in',
		logout: 'Log out',
		contact: 'Contact us',
		search: 'Search',
	},
	nav: {
		financials: 'Financials',
		income: 'Income',
		charts: 'Charts',
		data: 'Data',
		occupancy: 'Occupancy',
		list: 'List',
		settings: 'Settings',
		account: 'Account',
	},
	general: {
		name: 'Name',
	},
	filter: {
		start: 'Start',
		end: 'End',
		range: 'Range',
	},
	landing,
};

export default en;
