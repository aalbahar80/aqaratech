<script lang="ts" context="module">
	import PropertyPage from '$lib/components/property/PropertyPage.svelte';
	import { parseParams } from '$lib/utils/parse-params';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({
		params,
		stuff,
		url,
	}: LoadEvent<{ id: string }>) => {
		const sParams = parseParams(url);
		const chartFilter = { propertyId: params.id };

		const [property, units, income, expenses] = await Promise.all([
			stuff.api!.properties.findOne({ id: params.id }),
			stuff.api!.properties.findUnits({ id: params.id, ...sParams }),

			stuff.api!.analytics.getIncomeByMonth(chartFilter),
			stuff.api!.analytics.getExpensesByMonth(chartFilter),
		]);

		return { props: { property, units, income, expenses } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let property: Prop['property'];
	export let units: Prop['units'];

	export let income: Prop['income'];
	export let expenses: Prop['expenses'];
</script>

<PropertyPage {property} {units} {income} {expenses} />
