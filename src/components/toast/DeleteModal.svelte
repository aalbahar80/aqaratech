<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { addToast } from '$lib/stores/toast';
	import { mutation, operationStore } from '@urql/svelte';
	import { Button, Modal } from 'carbon-components-svelte';
	import type { ButtonProps } from 'carbon-components-svelte/types/Button/Button.svelte';
	import { TrashCan16 } from 'carbon-icons-svelte';
	import type { DocumentNode } from 'graphql';

	export let deleteDocumentNode: DocumentNode;
	export let id: string;
	export let buttonProps: Pick<ButtonProps, 'disabled'> | undefined = undefined;

	const deleteStore = operationStore(deleteDocumentNode);
	const deleteMutation = mutation(deleteStore);

	let open = false;

	const handleDelete = async () => {
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
				open = false;
			} else if (result.data) {
				console.log('Delete successful', result.data);
				addToast({
					duration: 10000,
					props: {
						kind: 'success',
						title: 'Delete successful',
					},
				});
				open = false;
				goto(`/${$page.url.pathname.split('/')[1]}`).catch((e) => {
					console.error(e);
				});
			}
		});
	};
</script>

<Button
	kind="danger-tertiary"
	iconDescription="Delete"
	icon={TrashCan16}
	on:click={() => {
		open = true;
	}}
	{...buttonProps}
/>

<Modal
	danger
	bind:open
	modalHeading="Are you sure?"
	primaryButtonText="Delete"
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => {
		open = false;
	}}
	on:open
	on:close
	on:submit={handleDelete}
/>
