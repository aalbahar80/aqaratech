<script lang="ts">
	import { createApi } from '$api';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { closeModal } from '$lib/components/toast/Modal.svelte';
	import { addToast } from '$lib/stores/toast';
	import { entitiesMap, type Entity } from '@self/utils';

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
			closeModal();
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
			closeModal();
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
