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
		renew: 'Renew',
		contract: 'Contract',
		print: 'Print',
		sendReminder: 'Send reminder',
		sendInvite: 'Send invite',
		pay: 'Pay',
		copyPayLink: 'Copy payment link',
		back: 'Back',
		subscribe: 'Subscribe',
	},
	billing: {
		subscriptionSettings: 'Subscription settings',
		activateNewSubscription: 'Activate a new subscription',
		viewInvoices: 'View your invoices',
		updatePaymentMethod: 'Update your payment method',
		cancelSubscription: 'Cancel subscription',
		cancelSubscriptionImmediately: 'Cancel your subscription immediately',
	},
	nav: {
		financials: 'Financials',
		income: 'Income',
		charts: 'Charts',
		data: 'Data',
		occupancy: 'Occupancy',
		list: 'List',
		settings: 'Settings',
		billing: 'Billing',
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
		noItems: 'There are no items to display.',
		paymentMethod: 'Payment method',
		online: 'Online',
		manual: 'Manual',
		late: 'Late',
		notLate: 'Not late',
	},
	charts: {
		empty: {
			title: 'No data',
			// subtitle: 'There is no data available for your selection.',
		},
		incomePie: {
			title: 'Income: by payment status',
			subtitle: 'Total income by payment status for the selected period.',
		},
		incomeBar: {
			title: 'Income: by month',
			subtitle: 'Total income by month for the selected period.',
		},
		occupancyHeatmap: {
			title: 'Occupancy',
			subtitle: 'Percentage of occupied units.',
		},
		expensesBar: {
			title: 'Expenses: by month',
			subtitle: 'Total expenses by month for the selected period.',
		},
		expensesLocationTreeMap: {
			title: 'Expenses: by location',
			subtitle: 'Total expenses by location for the selected period.',
			subtitle2:
				' Click on a tile to zoom in. Tile size is proportional to amount.',
		},
		expensesCategoryTreeMap: {
			title: 'Expenses: by category',
			subtitle: 'Total expenses by category for the selected period.',
			subtitle2:
				' Click on a tile to zoom in. Tile size is proportional to amount.',
		},
	},
	badge: {
		// Lease
		upcoming: 'Upcoming',
		current: 'Current',
		expired: 'Expired',
		expiry: 'Expiry',

		// Invoice
		notYetDue: 'Not yet due',
		due: 'Due',
		overdue: 'Past due',
		paid: 'Paid',
		unpaid: 'Unpaid',

		onTime: 'On time',
		late: 'Late',
		advanced: 'Advanced',

		// Maintenance
		inProgress: 'Pending',
		completed: 'Completed',
		cancelled: 'Cancelled',
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
		isPaidLate: 'Payment time',
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
	search: {
		titlePrefix: 'Seach for',
		// title: 'Search for tenants, owners, or properties.',
		subtitle: 'Search by name, address, etc.',
		noResults: 'No results found',
	},
	landing,
	aqaratech,
	other: {
		progress: 'Progress',
		vacancy: 'Vacancy',
		vacant: 'Vacant',
		occupied: 'Occupied',
		areYouSure: 'Are you sure?',
		customUnitLabel: 'To display a custom value, use the label field.',
		unspecifiedUnit: 'Unspecified unit',
		unspecifiedProperty: 'Unspecified property',
	},
};

export default en;
