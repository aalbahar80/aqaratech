<script lang="ts" context="module">
	import 'chartjs-adapter-date-fns';
	// import * as ChartjsPkg from 'chart.js';
	import * as ChartjsPkg from 'chart.js/dist/chart.esm';
	const {
		Chart,
		LinearScale,
		BarController,
		BarElement,
		CategoryScale,
		TimeScale,
		LineController,
		PointElement,
		LineElement,
		Tooltip,
	} = ChartjsPkg;

	Chart.register(
		LinearScale,
		BarController,
		BarElement,
		CategoryScale,
		TimeScale,
		LineController,
		PointElement,
		LineElement,
		Tooltip,
	);
	Chart.defaults.font.size = 16;
	Chart.defaults.font.family =
		'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';
</script>

<script lang="ts">
	export let chart;
	export let data;
</script>

<canvas width="400" height="400" use:chart={data} />
