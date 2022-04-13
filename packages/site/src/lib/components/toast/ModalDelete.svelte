<script lang="ts">
	import { goto } from '$app/navigation';
	import trpc from '$lib/client/trpc';
	import type { Entity } from '$models/interfaces/entity.interface';
	import Modal from './Modal.svelte';
	import { addToast } from '$lib/stores/toast';

	export let id: string;
	export let entity: Entity;
	export let isOpen: boolean;

	let isLoading = false;

	const handleConfirm = async () => {
		isLoading = true;
		try {
			// await new Promise((resolve) => setTimeout(resolve, 200));
			await trpc.mutation(`${entity}:delete`, id);
			isLoading = false;
			isOpen = false;
			await goto(`/${entity}`);

			// add toast after awaiting goto() to avoid weird modal behavior
			addToast({
				props: {
					kind: 'success',
					title: 'Delete successful',
				},
			});
		} catch (error) {
			isLoading = false;
			isOpen = false;
			addToast({
				props: {
					kind: 'error',
					title: 'Unable to delete',
				},
			});
			console.error(error);
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
