<script lang="ts">
	import { goto } from '$app/navigation';
	import ModalDelete2 from '$components/toast/ModalDelete2.svelte';
	import trpc from '$lib/client/trpc';
	import type { Entity } from '$lib/definitions';
	import { addToast } from '$lib/stores/toast';
	import { onDestroy, onMount, beforeUpdate, afterUpdate, tick } from 'svelte';

	onDestroy(() => {
		console.log('destroyed');
	});
	onMount(() => {
		console.log('mounted');
	});
	beforeUpdate(() => {
		console.log('before update');
	});
	afterUpdate(() => {
		console.log('after update');
	});

	export let id: string;
	export let isOpen = false;
	export let entity: Entity;

	let loading = false;

	const handleClose = () => {
		console.log('closing');
		isOpen = false;
	};

	const handleDelete = async () => {
		loading = true;
		try {
			// console.info('attempting to delete');
			// await trpc.mutation(`${entity}:delete`, id);
			loading = false;
			handleClose();
			await tick();
			await goto(`/${entity}`);
			// addToast({
			// 	props: {
			// 		kind: 'success',
			// 		title: 'Delete successful',
			// 	},
			// });
		} catch (e) {
			// TODO more specific error message
			loading = false;
			// addToast({
			// 	duration: 60000,
			// 	props: {
			// 		kind: 'error',
			// 		title: 'Unable to delete',
			// 	},
			// });
			console.error(e);
		}
	};
</script>

<!-- <slot {handleOpen}>
	<button
		type="button"
		class="inline-flex items-center justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm"
		on:click={handleOpen}
	>
		Delete account
	</button>
</slot> -->

<ModalDelete2
	{isOpen}
	{loading}
	on:delete={handleDelete}
	on:close={handleClose}
/>
