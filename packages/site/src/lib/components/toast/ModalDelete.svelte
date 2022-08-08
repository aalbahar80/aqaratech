<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { EntityTitle } from '$lib/models/types/entity.type';
	import { addToast } from '$lib/stores/toast';
	import Modal from './Modal.svelte';

	export let id: string;
	export let entity: EntityTitle;
	export let isOpen: boolean;
	export let onDelete: (() => void) | undefined = undefined;

	let isLoading = false;

	const handleConfirm = async () => {
		isLoading = true;
		try {
			await $page.stuff.api[entity].remove({ id });
			isLoading = false;
			isOpen = false;
			if (onDelete) {
				onDelete();
			} else {
				await goto(`/${entity}`);
			}

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
