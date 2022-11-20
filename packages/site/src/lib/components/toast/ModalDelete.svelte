<script lang="ts">
	import { createApi } from '$api';
	import { goto } from '$app/navigation';
	import { addToast } from '$lib/stores/toast';
	import { entitiesMap, type Entity } from '@self/utils';
	import Modal from './Modal.svelte';

	export let id: string;
	export let entity: Entity;
	export let isOpen: boolean;
	export let onDelete: (() => void) | undefined = undefined;
	export let deletePrompt = '';

	let isLoading = false;

	const handleConfirm = async () => {
		isLoading = true;
		const plural = entitiesMap[entity].plural;
		try {
			if (
				plural === 'maintenanceOrders' ||
				plural === 'expense categories' ||
				// file deletions are handled in `FileList.svelte`
				plural === 'files'
			) {
				throw new Error(`Delete not supported for ${entity}`);
			}
			await createApi()[plural].remove({ id });
			isLoading = false;
			isOpen = false;
			if (onDelete) {
				onDelete();
			} else {
				await goto(`/${entitiesMap[entity].urlName}`);
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
	{deletePrompt}
/>
