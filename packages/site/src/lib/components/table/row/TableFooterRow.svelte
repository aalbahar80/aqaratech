<script lang="ts">
	import { flexRender, type HeaderGroup } from '@tanstack/svelte-table';

	export let group: HeaderGroup<any>;
</script>

<tr>
	{#each group.headers as header}
		<th
			colSpan={header.colSpan}
			class="py-2 px-2 text-left text-sm font-semibold text-gray-900"
		>
			{#if !header.isPlaceholder}
				<svelte:component
					this={flexRender(header.column.columnDef.footer, header.getContext())}
				/>
			{/if}
		</th>
	{/each}
</tr>
