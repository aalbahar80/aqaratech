<script context="module" lang="ts">
	import LeaseForm from '$lib/components/lease/LeaseForm2.svelte';
	import type { PredefinedLease } from '$lib/models/interfaces/predefined.interface';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({ stuff, url }: LoadEvent) => {
		const predefined: PredefinedLease = {
			portfolioId: url.searchParams.get('portfolioId'),
			propertyId: url.searchParams.get('propertyId'),
			unitId: url.searchParams.get('unitId'),
			tenantId: url.searchParams.get('tenantId'),
		};

		const [portfolios, properties, units, tenants] = await Promise.all([
			stuff.api!.portfolios.findAll({ take: 1000 }),
			stuff.api!.properties.findAll({ take: 1000 }),
			stuff.api!.units.findAll({ take: 1000 }),
			stuff.api!.tenants.findAll({ take: 1000 }),
		]);

		return { props: { portfolios, properties, units, tenants, predefined } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let portfolios: Prop['portfolios'];
	export let properties: Prop['properties'];
	export let units: Prop['units'];
	export let tenants: Prop['tenants'];
	export let predefined: Prop['predefined'];
</script>

<LeaseForm
	formType="create"
	{predefined}
	{tenants}
	{portfolios}
	{properties}
	{units}
/>
