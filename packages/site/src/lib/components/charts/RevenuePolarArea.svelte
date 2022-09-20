<script lang="ts">
	import Chart from '$lib/components/charts/Chart.svelte';
	import { polarArea } from '$lib/components/charts/polar-area';
	import type { PaginatedLeaseInvoiceDto } from '$api/openapi';

	export let invoices: PaginatedLeaseInvoiceDto;

	type Dataset = {
		label: string;
		pctPaid: number;
		propertyId: string;
	};

	const calculate = (invoices: PaginatedLeaseInvoiceDto): Dataset[] => {
		const invoicesByPropertyId = invoices.results.reduce<
			Map<
				string,
				{ paid: number; unpaid: number; total: number; label: string }
			>
		>((acc, i) => {
			const propertyId = i.breadcrumbs.property.id;
			const property = acc.get(propertyId);
			const paid = i.isPaid ? i.amount : 0;
			const unpaid = i.isPaid ? 0 : i.amount;
			const total = i.amount;
			const label = i.breadcrumbs.property.label;
			if (property) {
				property.paid += paid;
				property.unpaid += unpaid;
				property.total += total;
				property.label = label;
			} else {
				acc.set(propertyId, { paid, unpaid, total, label });
			}
			return acc;
		}, new Map());

		const datasets: Dataset[] = [];
		for (const [propertyId, { paid, total, label }] of invoicesByPropertyId) {
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
					(_i, idx) =>
						`rgba(54, 162, 235, ${Math.max(0.3, idx / parsed.length)})`,
				),
			},
		],
	};
</script>

<Chart let:height let:width>
	<canvas {height} {width} use:polarArea={data} />
</Chart>
