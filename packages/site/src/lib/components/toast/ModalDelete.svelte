<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { addToast } from '$lib/stores/toast';
	import { entitiesMap, type Entity } from '@self/utils';
	import Modal from './Modal.svelte';

	export let id: string;
	export let entity: Entity;
	export let isOpen: boolean;
	export let onDelete: (() => void) | undefined = undefined;
	export let deletePrompt: string | undefined = undefined;

	let isLoading = false;

	const handleConfirm = async () => {
		isLoading = true;
		try {
			const plural = entitiesMap[entity].plural;
			await $page.stuff.api[plural].remove({ id });
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
	{deletePrompt}
/>
