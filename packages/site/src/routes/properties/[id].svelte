<script lang="ts" context="module">
	import BreadCrumb from '$components/breadcrumbs/BreadCrumb.svelte';
	import type { InferQueryOutput } from '$lib/client/trpc';
	import trpc from '$lib/client/trpc';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import UnitsList from '$lib/components/unit/UnitsList.svelte';
	import { dateFormat, getAddress } from '$lib/utils/common';
	import type { Load } from './[id]';

	export const load: Load = async ({ params }) => {
		const property = await trpc.query('properties:read', params.id);
		return { props: { property } };
	};
</script>

<script lang="ts">
	type Property = InferQueryOutput<'properties:read'>;
	export let property: Property;

	let details: [string, string | null][];
	$: details = [
		['Address', getAddress(property)],
		['Created on', dateFormat(property.createdAt)],
		['Last updated', property.updatedAt.toLocaleString()],
	];
</script>

<svelte:head>
	<title>{getAddress(property)}</title>
</svelte:head>

<Heading title="Property" id={property.id} entity="properties">
	<svelte:fragment slot="breadcrumbs">
		<BreadCrumb crumbs={[['clients', property.clientId]]} />
	</svelte:fragment>
</Heading>

<DetailsPane {details} />
<UnitsList units={property.units} />
