<script lang="ts" context="module">
	import { writable } from 'svelte/store';

	const isOpen = writable(false);

	export const closeModal = () => {
		console.log('Closing modal'); // TODO rm
		isOpen.set(false);
	};

	export const openModal = () => {
		console.log('Opening modal'); // TODO rm
		isOpen.set(true);
	};
</script>

<script lang="ts">
	import { createApi } from '$api';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { addToast } from '$lib/stores/toast';
	import { entitiesMap, type Entity } from '@self/utils';
	import Modal from './Modal.svelte';

	export let id: string;
	export let entity: Entity;
	export let onDelete: (() => void) | undefined = undefined;
	export let deletePrompt = '';

	let isLoading = false;

	const handleConfirm = async () => {
		isLoading = true;
		try {
			if (
				entity === 'maintenanceOrder' ||
				entity === 'expenseCategory' ||
				// file deletions are handled in `FileList.svelte`
				entity === 'file'
			) {
				throw new Error(`Delete not supported for ${entity}`);
			} else if (entity === 'role') {
				const plural = entitiesMap[entity].plural;
				const organizationId = $page.params.organizationId;
				console.log({ organizationId }, 'ModalDelete.svelte ~ 30');
				await createApi()[plural].remove({
					id,
					organizationId: $page.params['organizationId']!,
				});
			} else {
				const plural = entitiesMap[entity].plural;
				await createApi()[plural].remove({ id });
			}
			isLoading = false;
			$isOpen = false;
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
			$isOpen = false;
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
	bind:isOpen={$isOpen}
	bind:isLoading
	{handleConfirm}
	title="Delete"
	description="Are you sure?"
	{deletePrompt}
/>
