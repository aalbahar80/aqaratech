<script lang="ts">
	import Chart from '$lib/components/Chart.svelte';
	import { polarArea } from '$lib/components/charts/polar-area';
	import type { PaginatedExpenseDto } from '@self/sdk';

	export let expenses: PaginatedExpenseDto;

	type Dataset = {
		propertyId: string;
		label: string;
		total: number;
	};

	const calculate = (invoices: PaginatedExpenseDto): Dataset[] => {
		const expensesByPropertyId = invoices.results.reduce<
			Map<string, { total: number; label: string }>
		>((acc, i) => {
			const propertyId = i.breadcrumbs?.property?.id || 'Portfolio';
			const propertyLabel = i.breadcrumbs?.property?.label || propertyId;
			const propertyTotal = i.amount;
			const property = acc.get(propertyId);
			if (property) {
				property.total += propertyTotal;
			} else {
				acc.set(propertyId, {
					total: propertyTotal,
					label: propertyLabel,
				});
			}
			return acc;
		}, new Map());

		const datasets: Dataset[] = [];
		for (const [propertyId, { total, label }] of expensesByPropertyId) {
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
