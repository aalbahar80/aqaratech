<script lang="ts">
	import Chart from '$lib/components/Chart.svelte';
	import { polarArea } from '$lib/components/dashboard/charts/polar-area';
	import type { PaginatedExpenseDto } from '@self/sdk';

	export let expenses: PaginatedExpenseDto;

	type Dataset = {
		propertyId: string;
		label: string;
		total: number;
	};

	const calculate = (invoices: PaginatedExpenseDto): Dataset[] => {
		const invoicesByPropertyId = invoices.results.reduce<
			Record<string, { total: number; label: string }>
		>((acc, i) => {
			const propertyId = i.breadcrumbs?.property?.id;

			if (!propertyId) return acc;
			if (acc[propertyId]) {
				acc[propertyId].total += i.amount;
				acc[propertyId].label = i.breadcrumbs.property.label;
			} else {
				acc[propertyId] = {
					total: i.amount,
					label: i.breadcrumbs.property.label,
				};
			}
			return acc;
		}, {});

		const datasets: Dataset[] = [];
		for (const [propertyId, { total, label }] of Object.entries(
			invoicesByPropertyId,
		)) {
			datasets.push({
				propertyId,
				label,
				total,
			});
		}
		return datasets;
	};

	$: parsed = calculate(expenses);

	$: data = {
		labels: parsed.map((d) => d.label),
		datasets: [
			{
				label: 'Expenses By Property',
				data: parsed.map((i) => i.total),
				backgroundColor: parsed.map(
					(i, idx) =>
						`rgba(255, 99, 132, ${Math.max(0.3, idx / parsed.length)})`,
				),
			},
		],
	};
</script>

<Chart let:height let:width>
	<canvas {height} {width} use:polarArea={data} />
</Chart>
