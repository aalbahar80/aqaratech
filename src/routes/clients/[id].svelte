<script lang="ts" context="module">
	import ButtonDropdown from '$components/ButtonDropdown.svelte';
	import type { InferQueryOutput } from '$lib/client/trpc';
	import trpc from '$lib/client/trpc';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import PropertyList from '$lib/components/PropertyList.svelte';
	import ModalDelete from '$lib/components/toast/ModalDelete.svelte';
	import { dateFormat } from '$lib/utils/common';
	import { concatIfExists } from '$lib/utils/table-utils';
	import { Trash } from '@steeze-ui/heroicons';
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

	let isOpen = false;
	const openModal = () => {
		isOpen = true;
	};
</script>

<div class="mx-auto flex max-w-6xl flex-col space-y-6 p-4 sm:p-6 lg:p-8">
	<div class="flex items-center justify-between">
		<ModalDelete bind:isOpen id={client.id} entity="clients" />
		<div class="min-w-0 flex-1">
			<div class="mt-2 flex items-center space-x-8">
				<h2
					class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl"
				>
					Client
				</h2>
			</div>
		</div>
		<div class="mt-5 flex space-x-3 lg:mt-0 lg:ml-4">
			<ButtonDropdown
				defaultOption={{
					label: 'Edit',
					href: `/clients/${client.id}/edit`,
				}}
				options={[
					{
						label: 'Delete',
						icon: Trash,
						onClick: openModal,
					},
				]}
			/>
		</div>
	</div>
	<DetailsPane {details} />
	<PropertyList properties={client.properties} clientId={client.id} />
</div>
