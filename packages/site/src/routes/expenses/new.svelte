<script context="module" lang="ts">
	import ExpenseForm from '$lib/components/expense/ExpenseForm.svelte';
	import type { PredefinedExpense } from '$lib/models/interfaces/predefined.interface';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({ stuff, url }: LoadEvent) => {
		const predefined: PredefinedExpense = {
			portfolioId: url.searchParams.get('portfolioId'),
			propertyId: url.searchParams.get('propertyId'),
			unitId: url.searchParams.get('unitId'),
		};

		const [portfolios, properties, units] = await Promise.all([
			stuff.api!.portfolios.findAll({ take: 1000 }),
			stuff.api!.properties.findAll({ take: 1000 }),
			stuff.api!.units.findAll({ take: 1000 }),
		]);

		return { props: { portfolios, properties, units, predefined } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let portfolios: Prop['portfolios'];
	export let properties: Prop['properties'];
	export let predefined: Prop['predefined'];
	export let units: Prop['units'];
</script>

<ExpenseForm formType="create" {portfolios} {properties} {units} {predefined} />
