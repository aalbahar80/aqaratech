<script lang="ts" context="module">
	import type { InferQueryOutput } from '$lib/client/trpc';
	import trpc from '$lib/client/trpc';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import UnitsList from '$lib/components/unit/UnitsList.svelte';
	import { getAddress } from '$lib/utils/common';
	import type { Load } from './[id]';

	export const load: Load = async ({ params }) => {
		const property = await trpc.query('owner:properties:read', params.id);
		return { props: { property } };
	};
</script>

<script lang="ts">
	type Property = InferQueryOutput<'owner:properties:read'>;
	export let property: Property;

	let details: [string, string | null][];
	$: details = [['Address', getAddress(property)]];
</script>

<svelte:head>
	<title>{getAddress(property)}</title>
</svelte:head>

<Heading title="Property" id={property.id} entity="properties" hideActions />

<DetailsPane {details} />
<UnitsList units={property.units} readOnly />
