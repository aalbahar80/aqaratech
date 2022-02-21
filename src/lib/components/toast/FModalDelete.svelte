<script lang="ts">
	import { goto } from '$app/navigation';
	import ModalDelete from '$components/toast/ModalDelete.svelte';
	import trpc from '$lib/client/trpc';
	import { addToast } from '$lib/stores/toast';

	export let id: string;
	export let isOpen = false;

	let loading = false;

	const handleClose = () => {
		isOpen = false;
	};

	const handleOpen = () => {
		isOpen = true;
	};

	const handleDelete = async () => {
		loading = true;
		try {
			console.info('attempting to delete');
			await trpc.mutation(`tenants:delete`, id);
			addToast({
				props: {
					kind: 'success',
					title: 'Delete successful',
				},
			});
			loading = false;
			handleClose();
			await goto('/tenants');
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

<slot {handleOpen}>
	<button
		type="button"
		class="inline-flex items-center justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm"
		on:click={handleOpen}
	>
		Delete account
	</button>
</slot>

<ModalDelete
	{isOpen}
	{loading}
	on:delete={handleDelete}
	on:close={handleClose}
/>
