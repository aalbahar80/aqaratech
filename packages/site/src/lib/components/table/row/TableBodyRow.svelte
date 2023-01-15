<script lang="ts">
	import { flexRender, type Row } from '@tanstack/svelte-table';
	import clsx from 'clsx';

	import { fade } from 'svelte/transition';

	import { TABLE_ROW_SPACING } from './spacing';

	export let row: Row<{ id: string }>;
</script>

<tr class="odd:bg-white even:bg-gray-50" data-testid={row.original.id}>
	{#each row.getVisibleCells() as cell}
		{@const cellValueType = typeof cell.getValue()}
		<td
			in:fade={{ duration: 200 }}
			class={clsx(
				'py-4 px-2 text-base text-gray-600',
				{ 'slashed-zero tabular-nums': cellValueType === 'number' },
				TABLE_ROW_SPACING,
			)}
		>
			<!-- Rendering null cells throws. This might only be an issue
									when the entire column is null on a given page. -->
			{#if cell.getValue() !== null}
				<svelte:component
					this={flexRender(cell.column.columnDef.cell, cell.getContext())}
				/>
			{/if}
		</td>
	{/each}
</tr>
