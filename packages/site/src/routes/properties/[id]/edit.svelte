<script lang="ts" context="module">
	import PropertyForm from '$lib/components/property/PropertyForm.svelte';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({ params, stuff }: LoadEvent<{ id: string }>) => {
		const property = await stuff.api!.properties.findOne({ id: params.id });
		const portfolios = await stuff.api!.portfolios.findAll();

		return { props: { property, portfolios } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let property: Prop['property'];
	export let portfolios: Prop['portfolios'];
</script>

<PropertyForm data={property} {portfolios} />
