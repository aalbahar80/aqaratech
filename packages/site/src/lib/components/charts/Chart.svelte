<script lang="ts" context="module">
	import {
		ArcElement,
		BarController,
		BarElement,
		CategoryScale,
		Chart,
		Filler,
		Legend,
		LinearScale,
		LineController,
		LineElement,
		PieController,
		PointElement,
		TimeScale,
		Tooltip,
		type ActiveElement,
	} from 'chart.js';
	import 'chartjs-adapter-date-fns';

	import { CHART_HEIGHT } from '$lib/components/dashboard/cards/chart-height.const';

	type ManualChartType = InstanceType<typeof Chart> & {
		legend: {
			height: number;
			fit: () => void;
		};
	};

	// Adds padding to legend
	const legendMargin = {
		id: 'legendMargin',
		beforeInit(chart: ManualChartType) {
			const fitValue = chart.legend.fit;

			chart.legend.fit = function fit() {
				fitValue.bind(chart.legend)();
				// padding applied to bottom of legend

				return (this.height += 100);
			};
		},
	};

	Chart.register(
		Legend,
		Tooltip,
		Filler,
		LinearScale,
		CategoryScale,
		TimeScale,
		PointElement,
		BarElement,
		BarController,
		LineElement,
		LineController,
		PieController,
		ArcElement,
		legendMargin,
	);

	// Disable some animations that cause high CPU usage
	// Chart.defaults.animation = false;
	if (Chart.defaults.transitions.active) {
		Chart.defaults.transitions.active.animation.duration = 0; // disables the animation for 'active' mode, causes high CPU usage!
	}

	Chart.defaults.animations.colors = false; // could enable

	// Chart.defaults.aspectRatio = 2;
	Chart.defaults.maintainAspectRatio = false; // important for responsiveness
	Chart.defaults.font.size = 16;
	Chart.defaults.font.family =
		'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';
	Chart.defaults.plugins.legend.align = 'start';
	Chart.defaults.plugins.legend.labels.usePointStyle = true;
	Chart.defaults.plugins.legend.labels.pointStyle = 'rectRounded';
	Chart.defaults.normalized = true; // TODO ok?
	Chart.defaults.scales.time.time = {
		...Chart.defaults.scales.time.time,
		unit: 'month',
		tooltipFormat: 'MMM yy',
		displayFormats: {
			month: 'MMM yy',
		},
	};
	Chart.defaults.plugins.legend.labels.textAlign = 'center';
	Chart.defaults.plugins.legend.labels.padding = 14;
	Chart.defaults.plugins.tooltip = {
		...Chart.defaults.plugins.tooltip,

		// Spacing
		boxHeight: 20,
		bodySpacing: 10,
		titleSpacing: 20,
		titleMarginBottom: 10,
		usePointStyle: true,
		borderWidth: 1,

		// Colors
		// displayColors: true,
		backgroundColor: '#f3f4f6',
		borderColor: '#94a3b8',
		titleColor: 'hsl(0, 0%, 0%)',
		bodyColor: 'rgb(55 65 81)',
		boxWidth: 40,
		footerColor: '#f3f4f6',
		// multiKeyBackground: 'hsl(195, 100%, 50%)',

		animation: { duration: 0 }, // animating tooltip causes high CPU usage!

		position: 'top',
	};

	Tooltip.positioners.top = function (elements: readonly ActiveElement[]) {
		if (!elements[0]?.element.x) {
			return false;
		}

		const maxY = elements.reduce((acc, cur) => {
			return Math.min(acc, cur.element.y);
		}, 99999);

		return {
			x: elements[0]?.element.x, // change this for non-verical bar charts
			y: maxY - 10,
			xAlign: 'center',
			yAlign: 'bottom',
		};
	};

	const height = CHART_HEIGHT;
	const width = 400;
</script>

<div>
	<slot {height} {width} />
</div>
