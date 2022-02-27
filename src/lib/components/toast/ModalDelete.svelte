<script lang="ts">
	import { goto } from '$app/navigation';
	import trpc from '$lib/client/trpc';
	import type { Entity } from '$lib/definitions';
	import Modal from './Modal.svelte';
	import { addToast } from '$lib/stores/toast';

	export let id: string;
	export let entity: Entity;
	export let isOpen: boolean;

	let isLoading = false;

	const handleConfirm = async () => {
		isLoading = true;
		try {
			await trpc.mutation(`${entity}:delete`, id);
			addToast({
				props: {
					kind: 'success',
					title: 'Delete successful',
				},
			});
			isLoading = false;
			isOpen = false;
			// (Optional) wait for exit animation to finish
			// await new Promise((resolve) => setTimeout(resolve, 200));
			await goto(`/${entity}`);
		} catch (error) {
			isLoading = false;
			addToast({
				props: {
					kind: 'error',
					title: 'Unable to delete',
				},
			});
			console.error(error);
			throw error;
		}
	};
</script>

<Modal
	bind:isOpen
	bind:isLoading
	{handleConfirm}
	title="Delete"
	description="Are you sure?"
/>
