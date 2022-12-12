// Screenshots
import type { Icon } from '$lib/models/types/icon.type';

import screenshotDashboard from '../../../../assets/screenshots/dashboard-6.png';
import screenshotInvoices from '../../../../assets/screenshots/invoices.png';
import screenshotProfitLoss from '../../../../assets/screenshots/leases-3.png';

import HeroiconsBuildingOffice2 from '~icons/heroicons/building-office-2';
import HeroiconsUserGroup from '~icons/heroicons/user-group';
import MdiAccountTie from '~icons/mdi/account-tie';

export const secondaryFeatures = [
	{
		name: 'For property managers',
		summary: 'Steamline your workflows',
		description:
			'Leverage our powerful tools to keep track of all your properties. Aqaratech helps you organize your business and work more efficiently.',
		image: screenshotProfitLoss,
		icon: HeroiconsBuildingOffice2,
	},
	{
		name: 'For owners',
		summary: 'Complete visibility',
		description:
			'Use our dashboard to access and monitor all of your property information, granting you peace of mind helping you make informed decisions.',
		image: screenshotDashboard,
		icon: MdiAccountTie,
	},
	{
		name: 'For tenants',
		summary: 'Hassle-free rentals',
		description:
			'Aqaratech simplifies the rental process by allowing tenants to track their payments and leases.',
		// 'Aqaratech simplifies the rental process by allowing tenants to pay their rent at any time, from any device.',
		image: screenshotInvoices,
		icon: HeroiconsUserGroup,
	},
] satisfies SecondaryFeature[];

export interface SecondaryFeature {
	name: string;
	summary: string;
	description: string;
	image: unknown;
	icon: Icon;
}
