<script lang="ts">
	import Chart from '$lib/components/Chart.svelte';
	import { polarArea } from '$lib/components/dashboard/charts/polar-area';
	import type { PaginatedLeaseInvoiceDto } from '@self/sdk';

	export let invoices: PaginatedLeaseInvoiceDto;

	type Dataset = {
		label: string;
		pctPaid: number;
		propertyId: string;
	};

	const calculate = (invoices: PaginatedLeaseInvoiceDto): Dataset[] => {
		const invoicesByPropertyId = invoices.results.reduce<
			Record<
				string,
				{ paid: number; unpaid: number; total: number; label: string }
			>
		>((acc, i) => {
			const propertyId = i.breadcrumbs.property.id;
			if (acc[propertyId]) {
				acc[propertyId].paid += i.isPaid ? i.amount : 0;
				acc[propertyId].unpaid += i.isPaid ? 0 : i.amount;
				acc[propertyId].total += i.amount;
				acc[propertyId].label = i.breadcrumbs.property.label;
			} else {
				acc[propertyId] = {
					paid: i.isPaid ? i.amount : 0,
					unpaid: i.isPaid ? 0 : i.amount,
					total: i.amount,
					label: i.breadcrumbs.property.label,
				};
			}
			return acc;
		}, {});

		const datasets: Dataset[] = [];
		for (const [propertyId, { paid, total, label }] of Object.entries(
			invoicesByPropertyId,
		)) {
			datasets.push({
				propertyId,
				label,
				pctPaid: Math.round((paid / total) * 100 * 100) / 100, // round to 2 decimal places
			});
		}
		return datasets;
	};

	$: parsed = calculate(invoices);

	$: data = {
		labels: parsed.map((d) => d.label),
		datasets: [
			{
				label: 'Payment Status By Property',
				data: parsed.map((i) => i.pctPaid),
				backgroundColor: parsed.map(
					(i, idx) =>
						`rgba(54, 162, 235, ${Math.max(0.3, idx / parsed.length)})`,
				),
			},
		],
	};
</script>

<Chart let:height let:width>
	<canvas {height} {width} use:polarArea={data} />
</Chart>
