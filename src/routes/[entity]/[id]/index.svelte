<script context="module" lang="ts">
	import { page } from '$app/stores';
	import ModalDelete from '$components/toast/ModalDelete.svelte';
	import trpc, { type InferQueryOutput } from '$lib/client/trpc';
	import type { Entity } from '$lib/definitions';
	import { isEntity } from '$lib/definitions/index';
	import type { Load } from './index';

	export const load: Load = async ({ params }) => {
		const { entity, id } = params;
		if (!isEntity(entity)) {
			return {
				// status: 404,
				// error: 'Unknown entity',
				fallthrough: true,
			};
		}
		const data = await trpc.query(`${entity}:read`, id);
		if (data) {
			return {
				props: { data, entity },
			};
		}
		return { error: 'id not found', status: 404 };
	};
</script>

<script lang="ts">
	export let entity: Entity;
	export let data: NonNullable<InferQueryOutput<`${typeof entity}:read`>>;

	let isOpen = false;

	const openModal = () => {
		isOpen = true;
	};
</script>

<pre>
  {JSON.stringify(data, null, 2)}
</pre>

<button
	type="button"
	class="inline-flex items-center justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm"
	on:click={openModal}
>
	Delete
</button>

<a
	class="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-3 py-2 text-sm font-medium leading-4 text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
	href={`/${$page.params.entity}/${$page.params.id}/edit`}
>
	Edit
</a>
<ModalDelete bind:isOpen {entity} id={data.id} />
