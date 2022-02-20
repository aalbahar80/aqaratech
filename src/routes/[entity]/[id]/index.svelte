<script context="module" lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import ModalDelete from '$components/toast/ModalDelete.svelte';
	import trpc, { type InferQueryOutput } from '$lib/client/trpc';
	import type { Entity } from '$lib/definitions';
	import { isEntity } from '$lib/definitions/index';
	import { addToast } from '$lib/stores/toast';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ params }) => {
		const { entity, id } = params;
		if (!isEntity(entity)) {
			return {
				status: 404,
				error: 'Unknown entity',
			};
		}
		const data = await trpc.query(`${entity}:read`, id);
		if (data)
			return {
				props: { data, entity },
			};
		return { error: 'id not found', status: 404 };
	};
</script>

<script lang="ts">
	export let entity: Entity;
	export let data: NonNullable<InferQueryOutput<`${typeof entity}:read`>>;

	let isOpen = false;
	let loading = false;

	const handleClose = () => {
		isOpen = false;
	};

	const handleDelete = async () => {
		loading = true;
		try {
			console.info('attempting to delete');
			console.info(data);
			await trpc.mutation(`${entity}:delete`, data.id);
			addToast({
				props: {
					kind: 'success',
					title: 'Delete successful',
				},
			});
			loading = false;
			handleClose();
			await goto(`/${$page.params.entity}`);
		} catch (e) {
			// TODO more specific error message
			loading = false;
			addToast({
				duration: 60000,
				props: {
					kind: 'error',
					title: 'Unable to delete',
				},
			});
			console.error(e);
		}
	};
</script>

<pre>
  {JSON.stringify(data, null, 2)}
</pre>

<button
	type="button"
	class="inline-flex items-center justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm"
	on:click={() => {
		isOpen = true;
	}}
>
	Delete account
</button>

<ModalDelete
	{isOpen}
	{loading}
	on:delete={handleDelete}
	on:close={handleClose}
/>
