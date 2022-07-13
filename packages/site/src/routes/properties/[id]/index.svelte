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

		const [property, units] = await Promise.all([
			stuff.api!.properties.findOne({ id: params.id }),
			stuff.api!.properties.findUnits({ id: params.id, ...sParams }),
		]);

		return { props: { property, units } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let property: Prop['property'];
	export let units: Prop['units'];
</script>

<PropertyPage {property} {units} />
