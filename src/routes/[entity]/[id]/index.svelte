<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch, params }) => {
		const { entity, id } = params;
		const res = await fetch(`/${entity}/${id}.json`);
		const data = await res.json();
		return {
			props: { data },
		};
	};
</script>

<script lang="ts">
	import ModalDelete from '$components/toast/ModalDelete.svelte';

	export let data: any;

	let isOpen = false;
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

<ModalDelete bind:isOpen />
