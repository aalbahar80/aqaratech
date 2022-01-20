<script lang="ts">
	import type { DocumentNode } from 'graphql';
	import { Button } from 'carbon-components-svelte';
	import { DocumentExport16, Edit16, Renew16 } from 'carbon-icons-svelte';
	import DeleteModal from './toast/DeleteModal.svelte';
	import { page } from '$app/stores';

	export let deleteDocumentNode: DocumentNode;
	export let id: string;
</script>

<div class="grid grid-flow-col grid-rows-1 justify-end gap-4 mt-20">
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
	<div class="grid grid-flow-col grid-rows-1 justify-end gap-4 mt-4">
		<slot name="row2" />
	</div>
{/if}
