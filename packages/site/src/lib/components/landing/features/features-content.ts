import type { SvelteComponentTyped } from 'svelte';

// Icons
import HeroiconsOutlineChartBar from '~icons/heroicons-outline/chart-bar';
import HeroiconsOutlinePresentationChartBar from '~icons/heroicons-outline/presentation-chart-bar';
import HeroiconsOutlineRectangleGroup from '~icons/heroicons-outline/rectangle-group';
import HeroiconsArrowTrendingUp from '~icons/heroicons/arrow-trending-up';
import HeroiconsBanknotes from '~icons/heroicons/banknotes';
import HeroiconsBell from '~icons/heroicons/bell';
import HeroiconsChartPie from '~icons/heroicons/chart-pie';
import HeroiconsClipboardDocumentList from '~icons/heroicons/clipboard-document-list';
import HeroiconsClock from '~icons/heroicons/clock';
import HeroiconsCreditCard from '~icons/heroicons/credit-card';
import HeroiconsCubeTransparent from '~icons/heroicons/cube-transparent';
import HeroiconsCurrencyDollar from '~icons/heroicons/currency-dollar';
import HeroiconsDocumentMagnifyingGlass from '~icons/heroicons/document-magnifying-glass';
import HeroiconsFunnel from '~icons/heroicons/funnel';
import HeroiconsGlobeAlt from '~icons/heroicons/globe-alt';
import HeroiconsPresentationChartLine from '~icons/heroicons/presentation-chart-line';
import HeroiconsAdjustmentsVertical from '~icons/heroicons/adjustments-vertical';
import HeroiconsCalendarDays from '~icons/heroicons/calendar-days';
import HeroiconsCloud from '~icons/heroicons/cloud';

// Illustrations
import UndrawBusinessAnalytics from '../../../../assets/illustrations/undraw_business_analytics.svg';
import UndrawDataPoints from '../../../../assets/illustrations/undraw_data_points.svg';
import UndrawHouseSearching from '../../../../assets/illustrations/undraw_house_searching.svg';
import UndrawOnlinePayments from '../../../../assets/illustrations/undraw_online_payments.svg';
import UndrawSecureFiles from '../../../../assets/illustrations/undraw_secure_files.svg';
import UndrawVisualData from '../../../../assets/illustrations/undraw_visual_data.svg';

export interface FeatureBullet {
	text: string;
	icon: typeof SvelteComponentTyped<svelte.JSX.IntrinsicElements['svg']>;
}

export interface IFeature {
	title: string;
	image: string;
	bullets: FeatureBullet[];
}

export const features = [
	{
		title: 'Data and Analytics',
		image: UndrawBusinessAnalytics,
		bullets: [
			{
				text: 'Comprehensive tracking of property-related data, including units, leases, tenants, and more.',
				icon: HeroiconsOutlineChartBar,
			},
			{
				text: 'Interactive dashboards and reports, showing income, expenses, and profit/loss for each portfolio, property, and unit.',
				icon: HeroiconsChartPie,
			},
			{
				text: "Visualize your properties' financial data and identify trends and patterns over time.",
				icon: HeroiconsArrowTrendingUp,
				// icon: HeroiconsOutlinePresentationChartBar,
			},
			{
				text: "Monitor your properties' occupancy rates and vacancy periods using heatmaps.",
				icon: HeroiconsCalendarDays,
			},
		],
	},
	{
		title: 'Advanced Filtering',
		image: UndrawDataPoints,
		bullets: [
			{
				text: 'Customizable filters, so you can focus on the information that is most relevant to you.',
				icon: HeroiconsAdjustmentsVertical,
			},
			{
				text: 'Filter your properties and tenant data by location, including specific properties or units within properties.',
				icon: HeroiconsFunnel,
			},
			{
				text: 'Filter by time, including specific date ranges or time periods.',
				icon: HeroiconsClock,
			},
		],
	},
	{
		title: 'Rental Payment Tracking',
		image: UndrawOnlinePayments,
		bullets: [
			{
				text: 'Easy tracking and management of rental payments and lease agreements.',
				icon: HeroiconsBanknotes,
			},
			{
				text: 'Automated payment reminders.',
				icon: HeroiconsBell,
			},
			{
				text: 'Online KNET rent payments.',
				icon: HeroiconsCreditCard,
			},
		],
	},
	{
		title: 'Expense Tracking and Visualization',
		image: UndrawVisualData,
		bullets: [
			{
				text: 'Comprehensive expense tracking provides you with valuable granularity for expense analysis. Choose to attribute expenses to a portfolio, property, or even a single unit.',
				icon: HeroiconsCubeTransparent,
			},
			{
				text: 'Categorize expenses using a hierarchical system to better understand your expense sources.',
				icon: HeroiconsOutlineRectangleGroup,
			},
			{
				text: 'Visualize expenses using interactive treemaps, which allow you to quickly identify your cost patterns.',
				icon: HeroiconsArrowTrendingUp,
			},
		],
	},
	{
		title: 'Document Management',
		image: UndrawSecureFiles,
		bullets: [
			{
				text: 'Store and manage important documents related to your properties and tenants, including lease agreements, rental payment receipts, and maintenance records.',
				icon: HeroiconsClipboardDocumentList,
			},
			{
				text: 'Access your documents from anywhere, using any device.',
				icon: HeroiconsCloud,
			},
		],
	},

	{
		title: 'Smart Search',
		image: UndrawHouseSearching,
		bullets: [
			{
				text: 'Global: Search through all of your data at the same time.',
				icon: HeroiconsGlobeAlt,
			},
			{
				text: "Fuzzy: Find what you're looking for without knowing the exact spelling.",
				icon: HeroiconsDocumentMagnifyingGlass,
			},
		],
	},
] satisfies IFeature[];
