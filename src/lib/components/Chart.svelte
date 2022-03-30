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
	);
	Chart.defaults.font.size = 16;
	Chart.defaults.font.family =
		'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';
</script>

<!-- <div width="400" height="400"> -->
<div>
	<slot />
</div>
