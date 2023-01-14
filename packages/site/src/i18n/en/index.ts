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
		view: 'View',

		// actions
		edit: 'Edit',
		new: 'New',
		save: 'Save',
		cancel: 'Cancel',
		delete: 'Delete',
		export: 'Export',
		close: 'Close',
		addMultiple: 'Add multiple',
		toggleAll: 'Toggle all',
		markAsPaid: 'Mark as paid',
		options: 'Options',
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
		info: 'Info',
		net: 'Net',
	},
	general: {
		name: 'Name',
		phone: 'Phone',
		email: 'Email',
		paymentSchedule: 'Payment schedule',
		balance: 'Balance',
		details: 'Details',
		columns: 'Columns',
		all: 'All',
		total: 'Total',
		forPeriod: 'for period',
		collected: 'Collected',
		uncollected: 'Uncollected',
		unspecified: 'Unspecified',
		thisMonth: 'This month',
		lastMonth: 'Last month',
	},
	filter: {
		filters: 'Filters',
		start: 'Start',
		end: 'End',
		range: 'Range',
		monthToDate: 'Month to date',
		last3Months: 'Last 3 months',
		last6Months: 'Last 6 months',
		last12Months: 'Last 12 months',
		custom: 'Custom',
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
	other: {
		progress: 'Progress',
		vacancy: 'Vacancy',
		vacant: 'Vacant',
		occupied: 'Occupied',
		areYouSure: 'Are you sure?',
	},
};

export default en;
