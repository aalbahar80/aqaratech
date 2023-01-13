// Screenshots

import screenshotDashboard from '../../../../assets/screenshots/dashboard-6.png';
import screenshotInvoices from '../../../../assets/screenshots/invoices.png';
import screenshotProfitLoss from '../../../../assets/screenshots/leases-4.png';

import type L from '$i18n/i18n-svelte';
import type { Icon } from '$lib/models/types/icon.type';
import type { ReadableOf } from '$lib/utils/readable-of';

import HeroiconsBuildingOffice2 from '~icons/heroicons/building-office-2';
import HeroiconsUserGroup from '~icons/heroicons/user-group';
import MdiAccountTie from '~icons/mdi/account-tie';

export const getSecondaryFeatures = (LL: ReadableOf<typeof L>) =>
	[
		{
			name: LL.landing.secondaryFeatures.managers.name(),
			summary: LL.landing.secondaryFeatures.managers.summary(),
			description: LL.landing.secondaryFeatures.managers.description(),
			image: screenshotProfitLoss,
			icon: HeroiconsBuildingOffice2,
		},
		{
			name: LL.landing.secondaryFeatures.owners.name(),
			summary: LL.landing.secondaryFeatures.owners.summary(),
			description: LL.landing.secondaryFeatures.owners.description(),
			image: screenshotDashboard,
			icon: MdiAccountTie,
		},
		{
			name: LL.landing.secondaryFeatures.tenants.name(),
			summary: LL.landing.secondaryFeatures.tenants.summary(),
			description: LL.landing.secondaryFeatures.tenants.description(),
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
