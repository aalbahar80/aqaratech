<script lang="ts" context="module">
	import BreadCrumb from '$components/breadcrumbs/BreadCrumb.svelte';
	import type { InferQueryOutput } from '$lib/client/trpc';
	import trpc from '$lib/client/trpc';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import UnitsList from '$lib/components/UnitsList.svelte';
	import { label } from '$lib/definitions/property';
	import { dateFormat } from '$lib/utils/common';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ params }) => {
		if (params.id === 'add') return { fallthrough: true };
		const property = await trpc.query('properties:read', params.id);
		return { props: { property } };
	};
</script>

<script lang="ts">
	type Property = InferQueryOutput<'properties:read'>;
	export let property: Property;

	let details: [string, string | null][];
	$: details = [
		['Address', label(property)],
		['Created on', dateFormat(property.createdAt)],
		['Last updated', property.updatedAt.toLocaleString()],
	];
</script>

<div class="mx-auto flex max-w-4xl flex-col space-y-6 p-4 sm:p-6 lg:p-8">
	<Heading title="Property" id={property.id} entity="properties">
		<svelte:fragment slot="breadcrumbs">
			<BreadCrumb crumbs={[['clients', property.clientId]]} />
		</svelte:fragment>
	</Heading>

	<DetailsPane {details} />
	<UnitsList units={property.units} propertyId={property.id} />
</div>
