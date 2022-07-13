<script context="module" lang="ts">
	import UnitForm from '$lib/components/unit/UnitForm.svelte';
	import type { PredefinedUnit } from '$lib/models/interfaces/predefined.interface';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({ stuff, url }: LoadEvent) => {
		const predefined: PredefinedUnit = {
			// portfolioId: url.searchParams.get('portfolioId'),
			propertyId: url.searchParams.get('propertyId'),
		};

		const [portfolios, properties] = await Promise.all([
			stuff.api!.portfolios.findAll(),
			stuff.api!.properties.findAll(),
		]);

		return { props: { portfolios, properties, predefined } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let portfolios: Prop['portfolios'];
	export let properties: Prop['properties'];
	export let predefined: Prop['predefined'];
</script>

<UnitForm {portfolios} {properties} {predefined} />
