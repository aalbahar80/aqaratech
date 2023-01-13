import { aqaratech } from './aqaratech';
import { entity } from './entity';
import { fields } from './fields';
import { landing } from './landing';

import type { BaseTranslation } from '../i18n-types';

const en: BaseTranslation = {
	entity,
	fields,
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
		balance: 'Balance',
		details: 'Details',
		columns: 'Columns',
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
		show: 'Show',
		to: 'to',
		of: 'of',
		page: 'Page',
		// rows: 'Rows',
		// entries: 'entries',
		// records: 'records',
	},
	landing,
	aqaratech,
};

export default en;
