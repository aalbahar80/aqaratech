<script lang="ts" context="module">
	import type { InferQueryOutput } from '$lib/client/trpc';
	import { trpc } from '$lib/client/trpc';
	import { handleInvite } from '$lib/components/actions/invite';
	import AsyncButton from '$lib/components/AsyncButton.svelte';
	import Button from '$lib/components/Button.svelte';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import PropertyList from '$lib/components/property/PropertyList.svelte';
	import { dateFormat, getName } from '$lib/utils/common';
	import { Mail, PresentationChartBar } from '@steeze-ui/heroicons';
	import type { Load } from './index';

	export const load: Load = async ({ params, fetch }) => {
		if (params.id === 'add') return { fallthrough: true };
		const client = await trpc(fetch).query('clients:read', params.id);
		return { props: { client } };
	};
</script>

<script lang="ts">
	type Client = InferQueryOutput<'clients:read'>;
	export let client: Client;

	let details: [string, string | null][];
	$: details = [
		['Name', getName(client)],
		['Phone', client.phone],
		['Email', client.email],
		['Created on', dateFormat(client.createdAt)],
		['Last updated', client.updatedAt.toLocaleString()],
	];
</script>

<Heading title="Client" id={client.id} entity="clients">
	<svelte:fragment slot="actions">
		<Button
			icon={PresentationChartBar}
			text="Dashboard"
			as="a"
			href={`/clients/${client.id}/dashboard`}
			class="w-full sm:w-auto"
			prefetch
		/>
		<AsyncButton func={() => handleInvite(client.id, 'client')} let:loading>
			<Button
				as="div"
				{loading}
				icon={Mail}
				solid
				text="Invite"
				class="w-full sm:w-auto"
			/></AsyncButton
		>
	</svelte:fragment>
</Heading>
<DetailsPane {details} />
<PropertyList properties={client.properties} />
