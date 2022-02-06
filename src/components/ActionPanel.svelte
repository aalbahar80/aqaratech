<script lang="ts">
	import type { DocumentNode } from 'graphql';
	import DeleteModal from './toast/DeleteModal.svelte';
	import { page } from '$app/stores';

	export let deleteDocumentNode: DocumentNode;
	export let id: string;
</script>

<div class="mt-20 grid grid-flow-col grid-rows-1 justify-end gap-4">
	<Button
		href={`${$page.url.pathname}/edit`}
		kind="tertiary"
		iconDescription="Edit"
		icon={Edit16}
	/>

	<slot name="delete">
		<DeleteModal {id} {deleteDocumentNode} />
	</slot>
</div>

{#if $$slots.row2}
	<div class="mt-4 grid grid-flow-col grid-rows-1 justify-end gap-4">
		<slot name="row2" />
	</div>
{/if}
