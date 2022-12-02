<script lang="ts">
	// @ts-expect-error
	import Chart from 'svelte-frappe-charts';

	const colors = ['#ebedf0', '#c0ddf9', '#73b3f3', '#3886e1', '#17459e'];
	const date1 = new Date().getTime() / 1000;
	const data = {
		dataPoints: {
			1661065253.095: 20,
			'1463673055': 113,
			'1476892421': 57,
		},
		start: new Date('2022-07-29'),
		end: new Date('2023-07-29'),
	};
</script>

<Chart type="heatmap" {data} {colors} />
