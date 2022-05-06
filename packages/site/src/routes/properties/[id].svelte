<script lang="ts" context="module">
	import BreadCrumb from '$components/breadcrumbs/BreadCrumb.svelte';
	import { trpc } from '$lib/client/trpc';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import UnitsList from '$lib/components/unit/UnitsList.svelte';
	import { dateFormat, getAddress } from '$lib/utils/common';
	import type { Props } from '$models/types/Props.type';
	import type { LoadInput } from '@sveltejs/kit';

	export const load = async ({
		params,
		session,
	}: LoadInput<{ id: string }>) => {
		const property = session.authz?.isAdmin
			? await trpc().query('properties:read', params.id)
			: await trpc().query('owner:properties:read', params.id);

		return { props: { property } };
	};
</script>

<script lang="ts">
	type Property = Props<typeof load>['property'];
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
