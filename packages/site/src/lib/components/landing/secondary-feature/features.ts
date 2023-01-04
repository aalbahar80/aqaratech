// Screenshots

import screenshotDashboard from '../../../../assets/screenshots/dashboard-6.png';
import screenshotInvoices from '../../../../assets/screenshots/invoices.png';
import screenshotProfitLoss from '../../../../assets/screenshots/leases-4.png';

// eslint-disable-next-line import/no-named-as-default
import type LL from '$i18n/i18n-svelte';
import type { Icon } from '$lib/models/types/icon.type';
import type { ReadableOf } from '$lib/utils/readable-of';

import HeroiconsBuildingOffice2 from '~icons/heroicons/building-office-2';
import HeroiconsUserGroup from '~icons/heroicons/user-group';
import MdiAccountTie from '~icons/mdi/account-tie';

export const getSecondaryFeatures = (L: ReadableOf<typeof LL>) =>
	[
		{
			name: L.landing.secondaryFeatures.managers.name(),
			summary: L.landing.secondaryFeatures.managers.summary(),
			description: L.landing.secondaryFeatures.managers.description(),
			image: screenshotProfitLoss,
			icon: HeroiconsBuildingOffice2,
		},
		{
			name: L.landing.secondaryFeatures.owners.name(),
			summary: L.landing.secondaryFeatures.owners.summary(),
			description: L.landing.secondaryFeatures.owners.description(),
			image: screenshotDashboard,
			icon: MdiAccountTie,
		},
		{
			name: L.landing.secondaryFeatures.tenants.name(),
			summary: L.landing.secondaryFeatures.tenants.summary(),
			description: L.landing.secondaryFeatures.tenants.description(),
			image: screenshotInvoices,
			icon: HeroiconsUserGroup,
		},
	] satisfies ISecondaryFeature[];

export interface ISecondaryFeature {
	name: string;
	summary: string;
	description: string;
	image: string;
	icon: Icon;
}
