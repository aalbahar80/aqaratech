import type { SvelteComponentTyped } from 'svelte';

// Icons
import HeroiconsOutlineChartBar from '~icons/heroicons-outline/chart-bar';
import HeroiconsOutlineFilter from '~icons/heroicons-outline/filter';
import HeroiconsOutlinePresentationChartBar from '~icons/heroicons-outline/presentation-chart-bar';
import HeroiconsOutlineRectangleGroup from '~icons/heroicons-outline/rectangle-group';
import HeroiconsArrowTrendingUp from '~icons/heroicons/arrow-trending-up';
import HeroiconsBanknotes from '~icons/heroicons/banknotes';
import HeroiconsBell from '~icons/heroicons/bell';
import HeroiconsChartPie from '~icons/heroicons/chart-pie';
import HeroiconsClipboardDocumentList from '~icons/heroicons/clipboard-document-list';
import HeroiconsClock from '~icons/heroicons/clock';
import HeroiconsCreditCard from '~icons/heroicons/credit-card';
import HeroiconsCurrencyDollar from '~icons/heroicons/currency-dollar';
import HeroiconsDocumentMagnifyingGlass from '~icons/heroicons/document-magnifying-glass';
import HeroiconsGlobeAlt from '~icons/heroicons/globe-alt';
import HeroiconsPresentationChartLine from '~icons/heroicons/presentation-chart-line';

interface FeatureBullet {
	text: string;
	icon: typeof SvelteComponentTyped<svelte.JSX.IntrinsicElements['svg']>;
}

interface Feature {
	title: string;
	bullets: FeatureBullet[];
}

export const features = [
	{
		title: 'Data and Analytics',
		bullets: [
			{
				text: 'Comprehensive tracking of property-related data, including rental payments, expenses, and tenant communications',
				icon: HeroiconsOutlineChartBar,
			},
			{
				text: 'Interactive dashboards and reports, showing income, expenses, and profit/loss for each property',
				icon: HeroiconsChartPie,
			},
			{
				text: 'Advanced analytics and modeling tools, to help you make informed decisions about your properties and tenants',
				icon: HeroiconsOutlinePresentationChartBar,
			},
		],
	},
	{
		title: 'Advanced Filtering',
		bullets: [
			{
				text: 'Customizable filters, so you can focus on the information that is most relevant to you',
				icon: HeroiconsOutlineFilter,
			},
			{
				text: 'Filter your properties and tenant data by location, including specific properties or units within properties',
				icon: HeroiconsGlobeAlt,
			},
			{
				text: 'Filter by time, including specific date ranges or time periods',
				icon: HeroiconsClock,
			},
		],
	},
	{
		title: 'Rental Payment Tracking',
		bullets: [
			{
				text: 'Easy tracking and management of rental payments and lease agreements',
				icon: HeroiconsBanknotes,
			},
			{
				text: 'Automated payment reminders',
				icon: HeroiconsBell,
			},
			{
				text: 'Online KNET rent payments',
				icon: HeroiconsCreditCard,
			},
		],
	},
	{
		title: 'Expense Tracking and Data Visualization',
		bullets: [
			{
				text: 'Comprehensive tracking of property-related expenses, including utilities, repairs, and maintenance',
				icon: HeroiconsCurrencyDollar,
			},
			{
				text: 'Categorize expenses by hierarchical categories, to better understand your spending patterns',
				icon: HeroiconsOutlineRectangleGroup,
			},
			{
				text: "Visualize your properties' income and expenses, including trends and patterns over time",
				icon: HeroiconsArrowTrendingUp,
			},
			{
				text: 'Monitor occupancy rates and trends, using heatmaps and other data visualizations',
				icon: HeroiconsPresentationChartLine,
			},
		],
	},
	{
		title: 'Document Management',
		bullets: [
			{
				text: 'Store and manage important documents related to your properties and tenants, including lease agreements, rental payment receipts, and maintenance records',
				icon: HeroiconsClipboardDocumentList,
			},
		],
	},

	{
		title: 'Smart Search',
		bullets: [
			{
				text: 'Global search: Search through all of your data at the same time',
				icon: HeroiconsDocumentMagnifyingGlass,
			},
			{
				text: "Fuzzy search: Find what you're looking for even if you make a	mistake or only type part of the word.",
				icon: HeroiconsDocumentMagnifyingGlass,
			},
		],
	},
] satisfies Feature[];
