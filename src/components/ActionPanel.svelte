<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Button, Modal, ToastNotification } from 'carbon-components-svelte';
	import { TrashCan16, Edit16 } from 'carbon-icons-svelte';
	import { addToast } from '$lib/stores/toast';
	import { mutation, operationStore } from '@urql/svelte';
	import type { DocumentNode } from 'graphql';

	export let deleteDocumentNode: DocumentNode;
	export let id: string;

	const deleteStore = operationStore(deleteDocumentNode);
	const deleteMutation = mutation(deleteStore);

	let open = false;
	let loading = false;

	const handleDelete = async () => {
		loading = true;
		await deleteMutation({ id: +id }).then((result) => {
			if (result.error) {
				console.error('Unable to delete', result.error);
				addToast({
					duration: 10000,
					props: {
						kind: 'error',
						title: 'Unable to delete',
						subtitle: result.error.message,
					},
				});
				loading = false;
			} else if (result.data) {
				console.log('Delete successful', result.data);
				addToast({
					duration: 10000,
					props: {
						kind: 'success',
						title: 'Delete successful',
					},
				});
				loading = false;
				open = false;
			}
		});
	};
</script>

<button
	on:click={() =>
		addToast({
			duration: 10000,
			props: {
				kind: 'warning',
				title: 'a notification',
				subtitle: 'subtitle here',
				caption: new Date().toISOString(),
			},
		})}>EMIT TOAST</button
>

<div class="grid grid-flow-col grid-rows-1 justify-end gap-4">
	<Button
		href={`${$page.url.pathname}/edit`}
		kind="tertiary"
		iconDescription="Edit"
		icon={Edit16}
	/>
	<Button
		kind="danger-tertiary"
		iconDescription="Delete"
		icon={TrashCan16}
		on:click={() => (open = true)}
	/>

	<Modal
		danger
		bind:open
		modalHeading="Are you sure?"
		primaryButtonText="Delete"
		secondaryButtonText="Cancel"
		on:click:button--secondary={() => (open = false)}
		on:open
		on:close
		on:submit={handleDelete}
	>
		<p>This is a permanent action and cannot be undone.</p>
	</Modal>
</div>
