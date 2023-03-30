<script lang="ts">
	import { flexRender, type HeaderGroup } from '@tanstack/svelte-table';

	import { TABLE_ROW_SPACING } from './spacing';

	type T = $$Generic;

	export let group: HeaderGroup<T>;
</script>

<tr>
	{#each group.headers as header}
		<th
			colSpan={header.colSpan}
			class={`px-2 py-2 text-left text-sm font-semibold text-gray-900 ${TABLE_ROW_SPACING}`}
		>
			{#if !header.isPlaceholder}
				<svelte:component
					this={flexRender(header.column.columnDef.footer, header.getContext())}
				/>
			{/if}
		</th>
	{/each}
</tr>
