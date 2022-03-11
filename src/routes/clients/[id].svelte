<script lang="ts" context="module">
	import type { InferQueryOutput } from '$lib/client/trpc';
	import trpc from '$lib/client/trpc';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import PropertyList from '$lib/components/PropertyList.svelte';
	import { dateFormat } from '$lib/utils/common';
	import { concatIfExists } from '$lib/utils/table-utils';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ params }) => {
		if (params.id === 'add') return { fallthrough: true };
		const client = await trpc.query('clients:read', params.id);
		return { props: { client } };
	};
</script>

<script lang="ts">
	type Client = InferQueryOutput<'clients:read'>;
	export let client: Client;

	let details: [string, string | null][];
	$: details = [
		['Name', concatIfExists([client.firstName, client.lastName])],
		['Phone', client.phone],
		['Email', client.email],
		['Created on', dateFormat(client.createdAt)],
		['Last updated', client.updatedAt.toLocaleString()],
	];
</script>

<div class="mx-auto flex max-w-6xl flex-col space-y-6 p-4 sm:p-6 lg:p-8">
	<Heading title="Client" id={client.id} entity="clients" />
	<DetailsPane {details} />
	<PropertyList properties={client.properties} clientId={client.id} />
</div>
