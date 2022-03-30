<script lang="ts" context="module">
	import 'chartjs-adapter-date-fns';
	import {
		Chart,
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
	} from 'chart.js/dist/chart.esm';

	// Adds padding to legend
	const legendMargin = {
		id: 'legendMargin',
		beforeInit(chart, legend, options) {
			console.log(chart.legend.fit);
			const fitValue = chart.legend.fit;

			chart.legend.fit = function fit() {
				fitValue.bind(chart.legend)();
				// padding applied to bottom of legend
				return (this.height += 50);
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
		legendMargin,
	);
	Chart.defaults.font.size = 16;
	Chart.defaults.font.family =
		'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';
	Chart.defaults.interaction = {
		mode: 'nearest',
		// mode: 'index',
		axis: 'x',
		intersect: false,
	};
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
	Chart.defaults.plugins.tooltip = {
		...Chart.defaults.plugins.tooltip,
		xAlign: 'center',
		yAlign: 'bottom',

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
	};
</script>

<!-- <div width="400" height="400"> -->
<div>
	<slot />
</div>
