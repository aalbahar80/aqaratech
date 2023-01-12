import { aqaratech } from './aqaratech';
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

		// actions
		edit: 'Edit',
		new: 'New',
		save: 'Save',
		cancel: 'Cancel',
		delete: 'Delete',
		export: 'Export',
		close: 'Close',
		addMultiple: 'Add multiple',
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
		phone: 'Phone',
		email: 'Email',
		paymentSchedule: 'Payment schedule',
	},
	filter: {
		filters: 'Filters',
		start: 'Start',
		end: 'End',
		range: 'Range',
	},
	pagination: {
		next: 'Next',
		previous: 'Previous',
		showing: 'Showing',
		to: 'to',
		of: 'of',
		// entries: 'entries',
		// records: 'records',
	},
	landing,
	aqaratech,
};

export default en;
