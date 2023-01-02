import UndrawBusinessAnalytics from '../../../../assets/illustrations/undraw_business_analytics.svg';
import UndrawDataPoints from '../../../../assets/illustrations/undraw_data_points.svg';
import UndrawHouseSearching from '../../../../assets/illustrations/undraw_house_searching.svg';
import UndrawOnlinePayments from '../../../../assets/illustrations/undraw_online_payments.svg';
import UndrawSecureFiles from '../../../../assets/illustrations/undraw_secure_files.svg';
import UndrawVisualData from '../../../../assets/illustrations/undraw_visual_data.svg';

// eslint-disable-next-line import/no-named-as-default
import type LL from '$i18n/i18n-svelte';
import type { Icon } from '$lib/models/types/icon.type';
import type { ReadableOf } from '$lib/utils/readable-of';

import HeroiconsOutlineChartBar from '~icons/heroicons-outline/chart-bar';
import HeroiconsOutlineRectangleGroup from '~icons/heroicons-outline/rectangle-group';
import HeroiconsAdjustmentsVertical from '~icons/heroicons/adjustments-vertical';
import HeroiconsBell from '~icons/heroicons/bell';
import HeroiconsCalendarDays from '~icons/heroicons/calendar-days';
import HeroiconsClipboardDocumentList from '~icons/heroicons/clipboard-document-list';
import HeroiconsClock from '~icons/heroicons/clock';
import HeroiconsCloud from '~icons/heroicons/cloud';
// import HeroiconsCreditCard from '~icons/heroicons/credit-card';
import HeroiconsCubeTransparent from '~icons/heroicons/cube-transparent';
import HeroiconsDocumentMagnifyingGlass from '~icons/heroicons/document-magnifying-glass';
import HeroiconsFunnel from '~icons/heroicons/funnel';
import HeroiconsGlobeAlt from '~icons/heroicons/globe-alt';
import HeroiconsPresentationChartBar from '~icons/heroicons/presentation-chart-bar';
import HeroiconsPresentationChartLine from '~icons/heroicons/presentation-chart-line';
import TeenyiconsContractOutline from '~icons/teenyicons/contract-outline';

// Illustrations

export interface FeatureBullet {
	text: string;
	icon: Icon;
}

export interface IFeature {
	title: string;
	image: string;
	bullets: FeatureBullet[];
}

export const getFeatures = (L: ReadableOf<typeof LL>) =>
	[
		{
			title: L.landing.features.data.title(),
			image: UndrawBusinessAnalytics,
			bullets: [
				{
					text: L.landing.features.data.bullets.track(),
					icon: HeroiconsOutlineChartBar,
				},
				{
					text: L.landing.features.data.bullets.visualize(),
					icon: HeroiconsPresentationChartLine,
				},
				{
					text: L.landing.features.data.bullets.monitor(),
					icon: HeroiconsCalendarDays,
				},
			],
		},
		{
			title: L.landing.features.rental.title(),
			image: UndrawOnlinePayments,
			bullets: [
				{
					text: L.landing.features.rental.bullets.track(),
					icon: TeenyiconsContractOutline,
				},
				{
					text: L.landing.features.rental.bullets.reminders(),
					icon: HeroiconsBell,
				},
				// {
				// 	text: 'Online KNET rent payments.',
				// 	icon: HeroiconsCreditCard,
				// },
			],
		},
		{
			title: L.landing.features.expense.title(),
			image: UndrawVisualData,
			bullets: [
				{
					text: L.landing.features.expense.bullets.track(),
					icon: HeroiconsCubeTransparent,
				},
				{
					text: L.landing.features.expense.bullets.categorize(),
					icon: HeroiconsOutlineRectangleGroup,
				},
				{
					text: L.landing.features.expense.bullets.visualize(),
					icon: HeroiconsPresentationChartBar,
				},
			],
		},
		{
			title: L.landing.features.filter.title(),
			image: UndrawDataPoints,
			bullets: [
				{
					text: L.landing.features.filter.bullets.customizable(),
					icon: HeroiconsAdjustmentsVertical,
				},
				{
					text: L.landing.features.filter.bullets.properties(),
					icon: HeroiconsFunnel,
				},
				{
					text: L.landing.features.filter.bullets.time(),
					icon: HeroiconsClock,
				},
			],
		},
		{
			title: L.landing.features.document.title(),
			image: UndrawSecureFiles,
			bullets: [
				{
					text: L.landing.features.document.bullets.upload(),
					icon: HeroiconsClipboardDocumentList,
				},
				{
					text: L.landing.features.document.bullets.access(),
					icon: HeroiconsCloud,
				},
			],
		},

		{
			title: L.landing.features.search.title(),
			image: UndrawHouseSearching,
			bullets: [
				{
					text: L.landing.features.search.bullets.all(),
					icon: HeroiconsGlobeAlt,
				},
				{
					text: L.landing.features.search.bullets.spell(),
					icon: HeroiconsDocumentMagnifyingGlass,
				},
			],
		},
	] satisfies IFeature[];
