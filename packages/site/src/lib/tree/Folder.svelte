<script lang="ts">
	import AddButton from './AddButton.svelte';
	import File from './File.svelte';
	import LinkButton from './LinkButton.svelte';

	import { ROOT_ID, type ExpenseNode } from '$lib/utils/expense-type-options';
	import HeroiconsFolder from '~icons/heroicons/folder';
	import HeroiconsFolderOpen from '~icons/heroicons/folder-open';

	export let expanded = true;
	export let node: ExpenseNode;

	function toggle() {
		expanded = !expanded;
	}
</script>

<div class="flex gap-2" class:hidden={node.data.id === ROOT_ID}>
	<button class:expanded on:click={toggle} class="ps-6 flex gap-2 font-bold">
		<svelte:component
			this={expanded ? HeroiconsFolderOpen : HeroiconsFolder}
			class="text-gray-600"
		/>
		{node.data.label}
	</button>

	<LinkButton {node} />

	<AddButton {node} />
</div>

{#if expanded}
	<ul
		class="ms-2 ps-2 list-none border-gray-200 py-2 ltr:border-l-2 rtl:border-r-2"
	>
		{#each node.children ?? [] as file}
			<li class="p-1">
				{#if file.data.isGroup}
					<svelte:self node={file} />
				{:else}
					<File node={file} />
				{/if}
			</li>
		{/each}
	</ul>
{/if}
