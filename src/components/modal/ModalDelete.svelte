<script lang="ts">
	import ModalGeneric from '$components/modal/ModalGeneric.svelte';
	import { key } from '$components/keyyy';
	import { mutation, operationStore } from '@urql/svelte';
	import type { DocumentNode } from 'graphql';
	import { getContext } from 'svelte';
	import { failureToast, successToast } from '$components/toasts';

	export let id: number;
	let loading = false;
	const { getDeleteDoc } = getContext(key);
	const deleteDocumentNode: DocumentNode = getDeleteDoc();
	const deleteStore = operationStore(deleteDocumentNode);
	const deleteMutation = mutation(deleteStore);

	const proceedWithDelete = async (closeIt: () => void) => {
		loading = true;
		await deleteMutation({ id: id }).then((result) => {
			if (result.error) {
				console.error('Unable to delete', result.error);
				failureToast('Unable to delete');
				loading = false;
			} else if (result.data) {
				console.log('Delete successful', result.data);
				successToast('Delete successful');
				closeIt();
			}
		});
	};
</script>

<ModalGeneric>
	<div slot="trigger" let:openModal>
		<button class="btn btn-error btn-sm" tabindex="-1" on:click={openModal}>
			x
		</button>
	</div>
	<div slot="content" let:closeModal>
		<p class="p-4 text-3xl">Are you sure?</p>
		<div class="modal-action">
			<button class="btn btn-ghost btn-lg" on:click={closeModal}>
				Cancel
			</button>
			<button
				class="btn btn-error btn-lg"
				class:loading
				on:click={() => proceedWithDelete(closeModal)}
			>
				Delete
			</button>
		</div>
	</div>
</ModalGeneric>
