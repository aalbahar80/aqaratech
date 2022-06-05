<script lang="ts" context="module">
	import BreadCrumb from '$components/breadcrumbs/BreadCrumb.svelte';
	import { trpc } from '$lib/client/trpc';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import UnitsList from '$lib/components/unit/UnitsList.svelte';
	import { getAddress } from '$lib/utils/common';
	import type { Props } from '$models/types/Props.type';
	import type { LoadEvent } from '@sveltejs/kit';

	export const load = async ({
		params,
		session,
		fetch,
	}: LoadEvent<{ id: string }>) => {
		const property = session.authz?.isAdmin
			? await trpc(fetch).query('properties:read', params.id)
			: await trpc(fetch).query('owner:properties:read', params.id);

		return { props: { property } };
	};
</script>

<script lang="ts">
	type Property = Props<typeof load>['property'];
	export let property: Property;

	let details: [string, string | null][];
	$: details = [
		['Address', getAddress(property)],
		['Area', property.area],
		['Block', property.block],
		['Avenue', property.avenue],
		['Street', property.street],
		['Number', property.number],
		['Parcel', property.parcel],
		['Paci', property.paci],
	];
</script>

<Heading title="Property" id={property.id} entity="properties">
	<svelte:fragment slot="breadcrumbs">
		<BreadCrumb crumbs={{ portfolio: property.portfolioId }} />
	</svelte:fragment>
</Heading>

<DetailsPane {details} />
<UnitsList units={property.units} />
