<script lang="ts" context="module">
	import Button from '$components/Button.svelte';
	import type { InferQueryOutput } from '$lib/client/trpc';
	import trpc from '$lib/client/trpc';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import LeasesCard from '$lib/components/tenant/LeasesCard.svelte';
	import { dateFormat, kwdFormat } from '$lib/utils/common';
	import {
		faBath,
		faBed,
		faElevator,
		faMaximize,
		type IconDefinition,
	} from '@fortawesome/free-solid-svg-icons';
	import { DocumentText, Refresh } from '@steeze-ui/heroicons';
	import type { Load } from '@sveltejs/kit';
	import Fa from 'svelte-fa';

	export const load: Load = async ({ params }) => {
		if (params.id === 'add') return { fallthrough: true };
		const unit = await trpc.query('units:read', params.id);
		return { props: { unit } };
	};
</script>

<script lang="ts">
	type Unit = InferQueryOutput<'units:read'>;
	export let unit: Unit;

	let details: [string, string | null][];
	$: details = [
		['Unit Number', unit.unitNumber],
		['Type', unit.type],
		['Market Rent', kwdFormat(unit.marketRent)],
		['Created on', dateFormat(unit.createdAt)],
		['Last updated', unit.updatedAt.toLocaleString()],
	];

	type IconTooltip = {
		label: string | number | null | undefined;
		icon: IconDefinition;
		tooltip: string;
	};
	const icons: IconTooltip[] = [
		{
			label: unit.bed,
			icon: faBed,
			tooltip: 'Bedrooms',
		},
		{
			label: unit.bath,
			icon: faBath,
			tooltip: 'Bathrooms',
		},
		{
			label: `${unit.size?.toLocaleString()} m²`,
			icon: faMaximize,
			tooltip: 'Size',
		},
		{
			label: unit.floor,
			icon: faElevator,
			tooltip: 'Elevator',
		},
	];
</script>

<div class="mx-auto flex max-w-6xl flex-col space-y-6 p-4 sm:p-6 lg:p-8">
	<Heading title="Unit" id={unit.id} entity="units" {icons}>
		<svelte:fragment slot="actions">
			<Button
				icon={Refresh}
				text="Renew"
				as="a"
				href={`/leases/add?unitid=${'a'}&tenantid=${'a'}&monthlyrent=${'a'}`}
				class="w-full sm:w-auto"
			/>

			<Button
				icon={DocumentText}
				text="Contract"
				as="a"
				href={`/leases/${'a'}/contract`}
				class="w-full sm:w-auto"
			/>
		</svelte:fragment>
	</Heading>
	<DetailsPane {details} />
	<LeasesCard leases={unit.leases} unitId={unit.id} />
</div>
