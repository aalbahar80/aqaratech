<script lang="ts" context="module">
	import PropertyPage from '$lib/components/property/PropertyPage.svelte';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({ params, stuff }: LoadEvent<{ id: string }>) => {
		const [property, units] = await Promise.all([
			stuff.api!.properties.findOne({ id: params.id }),
			stuff.api!.properties.findUnits({ id: params.id }),
		]);

		return { props: { property, units } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let property: Prop['property'];
	export let units: Prop['units'];
</script>

<PropertyPage {property} units={units.results} />
